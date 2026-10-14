import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const root = process.cwd();
const outPath = path.join(root, "docs", "portfolio_project_documentation.pdf");

const fileUrl = (relativePath) =>
  `file://${path.join(root, relativePath).replaceAll(" ", "%20")}`;

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 54, bottom: 54, left: 54, right: 54 },
  bufferPages: true,
  info: {
    Title: "3D Portfolio Project Documentation",
    Author: "Dinesh Reddy Ande",
    Subject: "Implementation documentation for the 3D portfolio project",
  },
});

doc.pipe(fs.createWriteStream(outPath));

const colors = {
  ink: "#111827",
  muted: "#475569",
  faint: "#64748B",
  heading: "#0B2545",
  accent: "#2563EB",
  rule: "#D8DEE9",
  codeBg: "#F8FAFC",
  calloutBg: "#EEF6FF",
  darkPanel: "#0F172A",
};

const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

function ensureSpace(height) {
  if (doc.y + height > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
  }
}

function rule() {
  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .strokeColor(colors.rule)
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.7);
}

function title(text) {
  doc
    .font("Helvetica-Bold")
    .fontSize(28)
    .fillColor(colors.heading)
    .text(text, doc.page.margins.left, doc.y, { width: contentWidth, lineGap: 2 });
}

function subtitle(text) {
  doc
    .moveDown(0.5)
    .font("Helvetica")
    .fontSize(12.5)
    .fillColor(colors.muted)
    .text(text, doc.page.margins.left, doc.y, { width: contentWidth, lineGap: 3 });
}

function h2(text, linkPath) {
  ensureSpace(72);
  doc.moveDown(1.1);
  rule();
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor(colors.heading)
    .text(text, doc.page.margins.left, doc.y, {
      width: contentWidth,
      link: linkPath ? fileUrl(linkPath) : undefined,
      underline: Boolean(linkPath),
    });
  doc.moveDown(0.35);
}

function h3(text) {
  ensureSpace(42);
  doc
    .moveDown(0.6)
    .font("Helvetica-Bold")
    .fontSize(12.5)
    .fillColor(colors.heading)
    .text(text, doc.page.margins.left, doc.y, { width: contentWidth });
  doc.moveDown(0.15);
}

function p(text) {
  ensureSpace(44);
  doc
    .font("Helvetica")
    .fontSize(10.3)
    .fillColor(colors.ink)
    .text(text, doc.page.margins.left, doc.y, { width: contentWidth, lineGap: 3 });
  doc.moveDown(0.45);
}

function small(text) {
  doc
    .font("Helvetica")
    .fontSize(8.8)
    .fillColor(colors.faint)
    .text(text, doc.page.margins.left, doc.y, { width: contentWidth, lineGap: 2 });
  doc.moveDown(0.4);
}

function linkLine(label, relativePath) {
  ensureSpace(24);
  doc
    .font("Helvetica-Bold")
    .fontSize(9.6)
    .fillColor(colors.accent)
    .text(`${label}: ${relativePath}`, {
      width: contentWidth,
      link: fileUrl(relativePath),
      underline: true,
    });
  doc.moveDown(0.35);
}

function bullet(items) {
  for (const item of items) {
    ensureSpace(30);
    const x = doc.page.margins.left;
    const y = doc.y;
    doc.font("Helvetica").fontSize(10.2).fillColor(colors.ink);
    doc.text("•", x, y, { width: 12 });
    doc.text(item, x + 16, y, { width: contentWidth - 16, lineGap: 3 });
    doc.moveDown(0.25);
  }
  doc.moveDown(0.25);
}

function numbered(items) {
  items.forEach((item, index) => {
    ensureSpace(32);
    const x = doc.page.margins.left;
    const y = doc.y;
    doc.font("Helvetica").fontSize(10.2).fillColor(colors.ink);
    doc.text(`${index + 1}.`, x, y, { width: 18 });
    doc.text(item, x + 24, y, { width: contentWidth - 24, lineGap: 3 });
    doc.moveDown(0.3);
  });
  doc.moveDown(0.25);
}

function codeBlock(code) {
  const normalized = code.trim();
  const height = doc.heightOfString(normalized, {
    width: contentWidth - 20,
    lineGap: 1.7,
  }) + 18;
  ensureSpace(height + 12);
  const x = doc.page.margins.left;
  const y = doc.y;
  doc
    .roundedRect(x, y, contentWidth, height, 5)
    .fillAndStroke(colors.codeBg, colors.rule);
  doc
    .font("Courier")
    .fontSize(8.4)
    .fillColor("#0F172A")
    .text(normalized, x + 10, y + 9, {
      width: contentWidth - 20,
      lineGap: 1.7,
    });
  doc.y = y + height + 10;
}

function callout(text) {
  const height = doc.heightOfString(text, { width: contentWidth - 26, lineGap: 3 }) + 20;
  ensureSpace(height + 8);
  const x = doc.page.margins.left;
  const y = doc.y;
  doc.roundedRect(x, y, contentWidth, height, 6).fill(colors.calloutBg);
  doc.rect(x, y, 4, height).fill(colors.accent);
  doc
    .font("Helvetica")
    .fontSize(10.2)
    .fillColor(colors.ink)
    .text(text, x + 14, y + 10, { width: contentWidth - 26, lineGap: 3 });
  doc.y = y + height + 10;
}

function simpleTable(rows, widths) {
  const x0 = doc.page.margins.left;
  const padding = 6;
  for (const [rowIndex, row] of rows.entries()) {
    const cellHeights = row.map((cell, i) =>
      doc.heightOfString(cell, {
        width: widths[i] - padding * 2,
        lineGap: 2,
      }) + padding * 2
    );
    const rowHeight = Math.max(...cellHeights, 28);
    ensureSpace(rowHeight + 4);
    const rowY = doc.y;
    let x = x0;
    for (let i = 0; i < row.length; i += 1) {
      doc
        .rect(x, rowY, widths[i], rowHeight)
        .fillAndStroke(rowIndex === 0 ? "#EDF2F7" : "#FFFFFF", "#CFD8E3");
      doc
        .font(rowIndex === 0 ? "Helvetica-Bold" : "Helvetica")
        .fontSize(9.2)
        .fillColor(rowIndex === 0 ? colors.heading : colors.ink)
        .text(row[i], x + padding, rowY + padding, {
          width: widths[i] - padding * 2,
          lineGap: 2,
        });
      x += widths[i];
    }
    doc.y = rowY + rowHeight;
  }
  doc.moveDown(0.8);
}

function cover() {
  const x = doc.page.margins.left;
  const y = doc.y;
  doc.roundedRect(x, y, contentWidth, 172, 12).fill(colors.darkPanel);
  doc
    .font("Helvetica-Bold")
    .fontSize(29)
    .fillColor("#FFFFFF")
    .text("3D Portfolio Project Documentation", x + 24, y + 24, {
      width: contentWidth - 48,
      lineGap: 3,
    });
  doc
    .font("Helvetica")
    .fontSize(12.5)
    .fillColor("#D9ECFF")
    .text(
      "Detailed implementation guide for Dinesh Reddy Ande's React, Vite, Three.js, GSAP, and Tailwind CSS portfolio.",
      x + 24,
      y + 100,
      { width: contentWidth - 48, lineGap: 3 }
    );
  doc.y = y + 196;
  simpleTable(
    [
      ["Area", "Details"],
      ["Project", "three-d-portfolio-2025"],
      ["Framework", "React 19 with Vite"],
      ["UI and styling", "Tailwind CSS 4 plus custom CSS layers"],
      ["3D rendering", "Three.js, React Three Fiber, and Drei"],
      ["Animation", "GSAP and ScrollTrigger"],
      ["Profile focus", "Backend systems, cloud engineering, AI/RAG, and full-stack projects"],
    ],
    [145, contentWidth - 145]
  );
}

cover();
callout(
  "This PDF explains how the portfolio works from start to finish. It covers the runtime flow, file structure, major sections, data model, animation logic, 3D rendering, styling system, and practical commands for running and building the app."
);

h2("1. Executive Summary");
p(
  "This project is a single-page interactive 3D portfolio application. It uses Vite as the development and build tool, React as the UI framework, Tailwind CSS for layout and visual styling, GSAP for entrance and scroll-triggered animation, and React Three Fiber/Drei for 3D rendering. The site has been personalized around Dinesh Reddy Ande's software engineering profile, including experience at Infosys and OneAdvanced, graduate study at the University of Florida, backend systems, cloud platforms, and AI/RAG work."
);
p(
  "The application is component-based. Each major page area is isolated in a section component, while reusable pieces such as the navbar, buttons, glowing cards, counters, and 3D model cards live under src/components. Most profile content is centralized in src/constants/index.js, which makes the project easier to maintain because text, metrics, experience items, tech labels, and social links can be edited without rewriting section logic."
);
bullet([
  "Browser tab branding with Dinesh's name and a custom DR favicon.",
  "Responsive navigation with scroll-aware styling and a direct email action.",
  "Hero section with animated rotating keywords and an interactive 3D room scene.",
  "Resume-based counters for experience, transaction scale, API improvement, and ML precision.",
  "Text-first project showcase with structured project cards instead of screenshots.",
  "Animated technology marquee, feature cards, work timeline, 3D tech cards, and footer links.",
]);

h2("2. Technology Stack and Responsibility", "package.json");
simpleTable(
  [
    ["Technology", "Where it appears", "Responsibility"],
    ["Vite", "package.json, vite.config.js", "Development server, hot reload, production build, and preview workflow."],
    ["React 19", "src/main.jsx, src/App.jsx, section/components", "Composes the portfolio from reusable UI components."],
    ["Tailwind CSS 4", "src/index.css", "Controls layout, spacing, typography, color tokens, responsive behavior, and component styling."],
    ["GSAP + ScrollTrigger", "Hero, counters, projects, experience, skills", "Runs entrance animations, scroll-triggered reveals, counters, and timeline effects."],
    ["React Three Fiber + Drei", "HeroExperience, TechIconCardExperience", "Renders 3D scenes and GLB models inside React components."],
    ["Static assets", "public/images, public/models", "Stores icons, background imagery, favicon, and optimized GLB models."],
  ],
  [105, 170, contentWidth - 275]
);

h2("3. Project Structure");
p(
  "The project follows a standard Vite React layout. Static assets live in public, React source code lives in src, and the application is split into constants, components, sections, and model-specific components."
);
codeBlock(`
3d-portfolio/
+-- index.html
+-- package.json
+-- vite.config.js
+-- public/
|   +-- images/
|   |   +-- fav.svg
|   +-- models/
|       +-- optimized-room.glb
|       +-- react_logo-transformed.glb
|       +-- python-transformed.glb
+-- src/
    +-- main.jsx
    +-- App.jsx
    +-- index.css
    +-- constants/index.js
    +-- components/
    +-- sections/
`);

h2("4. Browser Entry and React Bootstrapping", "index.html");
p(
  "The browser first loads index.html. That file defines the favicon, tab title, root DOM node, and script entry point. The visible interface is not written directly in index.html; it is mounted by React."
);
codeBlock(`
<link rel="icon" type="image/svg+xml" href="/images/fav.svg" />
<title>Dinesh Reddy Ande - Portfolio</title>

<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
`);
linkLine("Code", "index.html");

h3("React entry point");
p(
  "src/main.jsx imports the global stylesheet and renders the App component into the root element. StrictMode is enabled so React can surface potential development issues."
);
codeBlock(`
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`);
linkLine("Code", "src/main.jsx");

h2("5. Application Composition", "src/App.jsx");
p(
  "App.jsx is the top-level page layout. It imports every visible section and renders them in the exact order users see on the page. This makes the page easy to reason about: if a section needs to be removed, moved, or replaced, App.jsx is the first place to look."
);
codeBlock(`
const App = () => (
  <>
    <Navbar />
    <Hero />
    <ShowcaseSection />
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <TechStack />
    <Footer />
  </>
);
`);
p(
  "The contact section and the education/highlight section were removed by deleting their imports and JSX tags from this file. The remaining flow is concise and focused on the strongest parts of the portfolio."
);
linkLine("Code", "src/App.jsx");

h2("6. Central Data Model", "src/constants/index.js");
p(
  "The constants file is the main content source for the portfolio. It stores navigation labels, animated hero words, counter values, skill lists, experience details, and footer links. Keeping content here prevents the UI components from becoming hardcoded and repetitive."
);
h3("Navigation data");
codeBlock(`
const navLinks = [
  { name: "Projects", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
];
`);
h3("Resume-based counters");
codeBlock(`
const counterItems = [
  { value: 3, suffix: "+", label: "Years of Software Engineering Experience" },
  { value: 1, suffix: "M+", label: "Peak Daily Transactions Supported" },
  { value: 70, suffix: "%", label: "API Throughput Improvement" },
  { value: 98, suffix: "%", label: "ML Crack Detection Precision" },
];
`);
h3("Experience records");
codeBlock(`
{
  review:
    "Modernized an account opening platform with compliant, event-driven services that improved processing efficiency by 40%.",
  company: "Infosys",
  logoText: "INFY",
  role: "Specialist Programmer L2",
  date: "July 2024 - August 2025",
  responsibilities: [
    "Built microservice architecture with Java, Spring Boot, Kafka, and Redis...",
    "Improved API throughput by 70%...",
  ],
}
`);
linkLine("Code", "src/constants/index.js");

h2("7. Navbar Implementation", "src/components/NavBar.jsx");
p(
  "The navbar displays the site owner name, section navigation, and an email button. It also listens for scroll events and changes its styling after the page has been scrolled more than ten pixels."
);
codeBlock(`
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const isScrolled = window.scrollY > 10;
    setScrolled(isScrolled);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
`);
p(
  "The component then conditionally assigns either scrolled or not-scrolled to the header. CSS uses those classes to switch the navbar between a transparent state and a black background."
);
codeBlock(`
<header className={\`navbar \${scrolled ? "scrolled" : "not-scrolled"}\`}>
  ...
</header>
`);
p(
  "The contact button is a direct email link. This is appropriate because the full contact form section was removed from the current site."
);
codeBlock(`
<a href="mailto:dineshreddy.ande@ufl.edu" className="contact-btn group">
  <div className="inner">
    <span>Email me</span>
  </div>
</a>
`);
linkLine("Code", "src/components/NavBar.jsx");

h2("8. Hero Section", "src/sections/Hero.jsx");
p(
  "The hero section introduces Dinesh and creates the strongest first impression. It contains a large animated headline, rotating keywords, an intro paragraph, a call-to-action button, the 3D room scene, and the animated counters below."
);
codeBlock(`
<div className="hero-text">
  <h1>
    Shaping
    <span className="slide">
      <span className="wrapper">
        {words.map((word, index) => (
          <span key={index} className="flex items-center md:gap-3 gap-1 pb-2">
            <img src={word.imgPath} alt="person" />
            <span>{word.text}</span>
          </span>
        ))}
      </span>
    </span>
  </h1>
  <h1>into Real Projects</h1>
  <h1>that Deliver Results</h1>
</div>
`);
p(
  "The rotating words are read from constants. CSS moves the wrapper vertically with a keyframe animation, so words like Backend, AI Systems, Cloud APIs, and Products appear inside the headline."
);
codeBlock(`
gsap.fromTo(
  ".hero-text h1",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
);
`);
p(
  "The intro sentence is constrained with a dedicated hero-intro class. This keeps the paragraph aligned under the headline instead of stretching too wide."
);
codeBlock(`
.hero-intro {
  @apply max-w-[28ch] md:max-w-[38ch] xl:max-w-[42ch] leading-relaxed;
}
`);
linkLine("Code", "src/sections/Hero.jsx");
linkLine("Styles", "src/index.css");

h2("9. Hero 3D Scene", "src/components/models/hero_models/HeroExperience.jsx");
p(
  "The hero 3D scene is built with React Three Fiber. Canvas creates a WebGL rendering surface. OrbitControls allows controlled rotation, while lights and the room model create the visual scene."
);
codeBlock(`
<Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
  <ambientLight intensity={0.2} color="#1a1a40" />
  <OrbitControls
    enablePan={false}
    enableZoom={!isTablet}
    maxDistance={20}
    minDistance={5}
    minPolarAngle={Math.PI / 5}
    maxPolarAngle={Math.PI / 2}
  />

  <Suspense fallback={null}>
    <HeroLights />
    <group scale={isMobile ? 0.7 : 1} position={[0, -3.5, 0]}>
      <Room />
    </group>
  </Suspense>
</Canvas>
`);
p(
  "The component uses media queries to adjust the scene for mobile and tablet screens. The falling particle effect was removed by removing the Particles import and render call, while keeping the room and lighting intact."
);
linkLine("Code", "src/components/models/hero_models/HeroExperience.jsx");

h2("10. Animated Counter Metrics", "src/components/AnimatedCounter.jsx");
p(
  "AnimatedCounter renders four metric cards and animates the values when the counter section enters the viewport. Each counter has a DOM ref so GSAP can update the displayed number."
);
codeBlock(`
gsap.to(numberElement, {
  innerText: item.value,
  duration: 2.5,
  ease: "power2.out",
  snap: { innerText: 1 },
  scrollTrigger: {
    trigger: "#counter",
    start: "top center",
  },
  onComplete: () => {
    numberElement.textContent = \`\${item.value}\${item.suffix}\`;
  },
});
`);
p(
  "This implementation keeps the animation numeric during the count, then applies the suffix at completion. That is why values such as 1M+, 70%, and 98% display cleanly after the animation finishes."
);
linkLine("Code", "src/components/AnimatedCounter.jsx");

h2("11. Project Showcase", "src/sections/ShowcaseSection.jsx");
p(
  "The project section was redesigned to avoid using placeholder screenshots. It now uses text-first case-study cards with project numbers, category labels, descriptions, metric callouts, and tech stack tags."
);
codeBlock(`
const projects = [
  {
    number: "01",
    title: "Agentic Multimodal RAG Assistant",
    kicker: "Grounded AI assistant",
    description:
      "A local-first chatbot with authenticated document upload, voice input, source-cited chat, session memory, web-search fallback, ChromaDB retrieval, and cross-encoder reranking.",
    metric: "Source-cited answers",
    stack: ["FastAPI", "Streamlit", "LangChain", "ChromaDB"],
  },
];
`);
p(
  "The first project is featured on the left. Projects 2 and 3 are stacked on the right and use the compact card variant to reduce text size and spacing."
);
codeBlock(`
<ProjectCard project={projects[0]} featured />
<ProjectCard project={projects[1]} />
<ProjectCard project={projects[2]} />
`);
codeBlock(`
const ProjectCard = ({ project, featured = false }) => (
  <article className={\`project-card \${featured ? "featured" : "compact"}\`}>
    <div className="project-card-top">
      <span>{project.number}</span>
      <p>{project.kicker}</p>
    </div>
    <div className="project-card-body">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
    <div className="project-card-footer">
      <strong>{project.metric}</strong>
      <div>
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  </article>
);
`);
p(
  "GSAP also animates the project cards into view. Each card starts slightly lower and transparent, then slides up and fades in when scrolled near the viewport."
);
linkLine("Code", "src/sections/ShowcaseSection.jsx");
linkLine("Styles", "src/index.css");

h2("12. Skills Marquee", "src/sections/LogoShowcase.jsx");
p(
  "The marquee displays technology names in a continuous horizontal scroll. The list is rendered twice so the animation can loop smoothly without leaving an empty gap."
);
codeBlock(`
{logoIconsList.map((icon, index) => (
  <LogoIcon key={index} icon={icon} />
))}

{logoIconsList.map((icon, index) => (
  <LogoIcon key={index} icon={icon} />
))}
`);
codeBlock(`
.marquee-box {
  display: flex;
  align-items: center;
  width: 200%;
  animation: marquee 60s linear infinite;
}

@keyframes marquee {
  0% { left: 0; }
  100% { left: -100%; }
}
`);
linkLine("Code", "src/sections/LogoShowcase.jsx");

h2("13. Feature Cards", "src/sections/FeatureCards.jsx");
p(
  "FeatureCards renders three summary cards from the abilities array. These cards communicate the main value areas of the portfolio: backend systems at scale, applied AI/RAG, and cloud delivery discipline."
);
codeBlock(`
{abilities.map(({ imgPath, title, desc }) => (
  <div key={title} className="card-border rounded-xl p-8 flex flex-col gap-4">
    <div className="size-14 flex items-center justify-center rounded-full">
      <img src={imgPath} alt={title} />
    </div>
    <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
    <p className="text-white-50 text-lg">{desc}</p>
  </div>
))}
`);
linkLine("Code", "src/sections/FeatureCards.jsx");

h2("14. Work Experience Timeline", "src/sections/Experience.jsx");
p(
  "The experience section maps over expCards and creates a timeline entry for each role. The left side uses a glowing card with a company identity block. The right side shows the company, role, date, and bullet responsibilities."
);
codeBlock(`
{expCards.map((card) => (
  <div key={card.title} className="exp-card-wrapper">
    <div className="xl:w-2/6">
      <GlowCard card={card}>
        <div className="company-panel-brand">
          <div className="company-panel-mark">{card.logoText}</div>
          <div>
            <p>{card.company}</p>
            <span>{card.role}</span>
          </div>
        </div>
      </GlowCard>
    </div>
  </div>
))}
`);
codeBlock(`
<p className="text-[#839CB5] font-semibold uppercase tracking-wide">
  {card.company}
</p>
<h1 className="font-semibold text-3xl">{card.role}</h1>
<p className="my-5 text-white-50">{card.date}</p>

<ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
  {card.responsibilities.map((responsibility, index) => (
    <li key={index} className="text-lg">
      {responsibility}
    </li>
  ))}
</ul>
`);
p(
  "ScrollTrigger is used heavily here. Timeline cards animate from the left, text blocks fade in, and the vertical timeline line scales as the user scrolls through the section."
);
codeBlock(`
gsap.utils.toArray(".timeline-card").forEach((card) => {
  gsap.from(card, {
    xPercent: -100,
    opacity: 0,
    transformOrigin: "left left",
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
  });
});
`);
linkLine("Code", "src/sections/Experience.jsx");
linkLine("Data", "src/constants/index.js");

h2("15. GlowCard Interaction", "src/components/GlowCard.jsx");
p(
  "GlowCard creates an interactive border glow based on mouse position. It calculates the pointer angle relative to the card center and writes that angle into a CSS variable. CSS then uses that variable in a conic gradient mask."
);
codeBlock(`
const rect = card.getBoundingClientRect();
const mouseX = e.clientX - rect.left - rect.width / 2;
const mouseY = e.clientY - rect.top - rect.height / 2;

let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
angle = (angle + 360) % 360;

card.style.setProperty("--start", angle + 60);
`);
codeBlock(`
.card::before {
  background: var(--gradient);
  mask: linear-gradient(#0000, #0000),
    conic-gradient(
      from calc((var(--start) - 15) * 1deg),
      #ffffff1f 0deg,
      white,
      #ffffff00 100deg
    );
  opacity: 0;
}

.card:hover::before {
  opacity: 1;
}
`);
linkLine("Code", "src/components/GlowCard.jsx");

h2("16. 3D Tech Stack Section", "src/sections/TechStack.jsx");
p(
  "The skills section renders five 3D tech cards from the techStackIcons array. Each card contains a GLB model, a hover background animation, and a text label describing the skill area."
);
codeBlock(`
{techStackIcons.map((techStackIcon) => (
  <div
    key={techStackIcon.name}
    className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
  >
    <div className="tech-card-animated-bg" />
    <div className="tech-card-content">
      <div className="tech-icon-wrapper">
        <TechIconCardExperience model={techStackIcon} />
      </div>
      <div className="padding-x w-full">
        <p>{techStackIcon.name}</p>
      </div>
    </div>
  </div>
))}
`);
p(
  "The actual model rendering is delegated to TechIconCardExperience. This keeps TechStack focused on layout, while the 3D component handles lights, scene loading, floating animation, and OrbitControls."
);
codeBlock(`
const scene = useGLTF(model.modelPath);

<Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
  <group scale={model.scale} rotation={model.rotation}>
    <primitive object={scene.scene} />
  </group>
</Float>
`);
linkLine("Code", "src/sections/TechStack.jsx");
linkLine("3D model renderer", "src/components/models/tech_logos/TechIconCardExperience.jsx");

h2("17. Footer and External Links", "src/sections/Footer.jsx");
p(
  "The footer renders social links from the socialImgs array. It supports normal external links and mailto links. External links open in a new tab, while email opens the user's mail client."
);
codeBlock(`
{socialImgs.map((socialImg, index) => (
  <a
    key={index}
    className="icon"
    href={socialImg.link}
    target={socialImg.link.startsWith("mailto:") ? undefined : "_blank"}
    rel="noreferrer"
    aria-label={socialImg.name}
  >
    <img src={socialImg.imgPath} alt="" />
  </a>
))}
`);
linkLine("Code", "src/sections/Footer.jsx");

h2("18. Styling System", "src/index.css");
p(
  "The styling system is centralized in src/index.css. It imports the font, loads Tailwind, defines custom colors, and groups reusable utilities and component styles. This file controls almost all visual behavior in the app."
);
codeBlock(`
@import url("https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap");
@import "tailwindcss";

@theme {
  --font-sans: "Mona Sans", sans-serif;
  --color-white-50: #d9ecff;
  --color-black-50: #1c1c21;
  --color-black-100: #0e0e10;
  --color-black-200: #282732;
}
`);
p(
  "Tailwind layers are used to define utilities and component styles. This makes repeated classes like flex-center, section-padding, grid helpers, navbar styles, project card styles, and footer styles reusable."
);
codeBlock(`
@layer utilities {
  .flex-center {
    @apply flex justify-center items-center;
  }
}

@layer components {
  .section-padding {
    @apply px-5 md:px-10 md:mt-40 mt-20;
  }
}
`);
linkLine("Code", "src/index.css");

h2("19. Responsiveness");
p(
  "Responsiveness is handled through Tailwind breakpoint prefixes and a small amount of runtime screen detection for 3D rendering. Tailwind classes such as md:, xl:, and 2xl: control grids, spacing, font sizes, card heights, and section layout."
);
p(
  "For the 3D hero scene, react-responsive is used to detect mobile and tablet screens. That affects room scale and whether zoom is enabled in OrbitControls."
);
codeBlock(`
const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
`);

h2("20. Running, Building, and Verifying the App", "package.json");
p("The app is managed with npm scripts defined in package.json.");
codeBlock(`
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
`);
h3("Install dependencies");
codeBlock("npm install");
h3("Start local development server");
codeBlock("npm run dev");
h3("Create a production build");
codeBlock("npm run build");
h3("Preview the production build");
codeBlock("npm run preview");
h3("Run linting");
codeBlock("npm run lint");

h2("21. Important Customizations Already Implemented");
bullet([
  "Changed the browser tab from the template name to Dinesh Reddy Ande - Portfolio.",
  "Added a custom DR favicon at public/images/fav.svg.",
  "Personalized the hero, counters, skills, projects, experience, and footer links with resume-based details.",
  "Removed the contact form and replaced the navbar CTA with a direct email link.",
  "Removed the education/highlight section to keep the page focused.",
  "Rebuilt the project area into text-first case-study cards without screenshots.",
  "Changed work experience panels and timeline marks to show Infosys and OneAdvanced instead of template companies.",
  "Removed the falling particle effect from the hero scene.",
]);

h2("22. Recommended Future Improvements");
numbered([
  "Add real GitHub and live demo links to each project card once the repositories or deployments are ready to share.",
  "Replace inherited placeholder social icon images with precise GitHub, email, and LinkedIn SVG icons.",
  "Add a resume download button in the hero or navbar.",
  "Code-split the 3D sections with dynamic imports to reduce the initial JavaScript bundle size.",
  "Audit all image alt text and aria labels before deploying publicly.",
  "Optimize GLB model sizes periodically to protect page speed.",
  "Consider adding lightweight project detail pages if you want each project to tell a deeper story.",
]);

h2("23. Final Summary");
p(
  "The portfolio is a modern, interactive React application with strong visual presentation and maintainable code organization. App.jsx controls section order, constants/index.js controls profile content, section components render major page areas, reusable components provide shared UI behavior, and specialized 3D components render WebGL scenes and GLB models."
);
p(
  "The implementation now reflects Dinesh Reddy Ande's actual profile rather than the original template. It emphasizes scalable backend systems, AI/RAG applications, cloud delivery, financial software experience, selected projects, and professional engineering impact."
);
small(`Generated from local project path: ${root}`);

doc.end();

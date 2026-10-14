const navLinks = [
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#work" },
  { name: "Skills", link: "#skills" },
  { name: "Education", link: "#education" },
  { name: "Certifications", link: "#certifications" },
  { name: "Contact", link: "#contact" },
];

const profile = {
  name: "Dinesh Ande",
  fullName: "Dinesh Reddy Ande",
  email: "dineshreddy.ande@ufl.edu",
  phone: "+1 352-709-7732",
  github: "https://github.com/adineshreddy",
  linkedin: "https://www.linkedin.com/in/dinesh-ande",
  resume: "/resume/Dinesh_Ande_Resume.pdf",
  location: "Gainesville, FL",
};

const words = [
  { text: "Low Latency", imgPath: "/images/code.svg" },
  { text: "Distributed", imgPath: "/images/concepts.svg" },
  { text: "AI-Driven", imgPath: "/images/ideas.svg" },
  { text: "Reliable", imgPath: "/images/designs.svg" },
  { text: "Low Latency", imgPath: "/images/code.svg" },
  { text: "Distributed", imgPath: "/images/concepts.svg" },
  { text: "AI-Driven", imgPath: "/images/ideas.svg" },
  { text: "Reliable", imgPath: "/images/designs.svg" },
];

const counterItems = [
  { value: 3, suffix: "+", label: "Years Building Production Software" },
  { value: 1, suffix: "M+", label: "Daily API Transactions Scaled" },
  { value: 6, suffix: ".25M", label: "Orders/sec in C++ Matching Engine" },
  { value: 4, suffix: ".0 GPA", label: "MS Computer Science, University of Florida" },
];

const logoIconsList = [
  { name: "C++17" },
  { name: "Java" },
  { name: "Python" },
  { name: "Go" },
  { name: "Spring Boot" },
  { name: "FastAPI" },
  { name: "Kafka" },
  { name: "gRPC" },
  { name: "PostgreSQL" },
  { name: "Redis" },
  { name: "AWS" },
  { name: "React" },
  { name: "Prometheus" },
  { name: "Grafana" },
  { name: "Jenkins" },
  { name: "GitHub Actions" },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Low-Latency & Concurrent Systems",
    desc: "Multithreaded C++ and Java services tuned for throughput: lock-aware designs, thread pools, async I/O, and O(1) data structures.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Distributed Backend Engineering",
    desc: "Spring Boot and FastAPI microservices over Kafka, gRPC, PostgreSQL, and Redis, built for at-least-once delivery and fast recovery.",
  },
  {
    imgPath: "/images/time.png",
    title: "Applied AI & Quality Delivery",
    desc: "RAG retrieval and evaluation pipelines, AI-assisted development with Cursor and Claude Code, and CI/CD backed by hundreds of automated tests.",
  },
];

const skillGroups = [
  { title: "Languages", items: ["C++", "Java", "Python", "Go", "JavaScript", "SQL"] },
  { title: "Computer Science", items: ["Data Structures", "Algorithms", "Object-Oriented Programming"] },
  { title: "Systems", items: ["Multithreading", "Concurrency", "Distributed Systems", "Linux/Unix"] },
  { title: "Backend & Data", items: ["Spring Boot", "FastAPI", "REST APIs", "gRPC", "Kafka", "PostgreSQL", "Redis"] },
  { title: "Testing & Delivery", items: ["PyTest", "JUnit", "Git", "GitHub Actions", "Jenkins", "Code Review"] },
  { title: "AI Development Tools", items: ["Cursor", "Claude Code", "GitHub Copilot"] },
];

const techStackIcons = [
  {
    name: "Java, Spring Boot & Kafka Microservices",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Python, FastAPI & RAG Pipelines",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "React & Accessible UI",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "C++, Go & Concurrent Systems",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Git, CI/CD & Observability",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Building the AI backend behind a clinical care pilot: retrieval quality, response latency, and test-backed releases that clinicians can rely on.",
    imgPath: "/images/exp1.png",
    company: "PrismaP - Intelligent Clinical Care Center",
    logoText: "PP",
    role: "Software Engineer Intern",
    title: "PrismaP - Software Engineer Intern",
    date: "Jun 2026 - Present",
    location: "Gainesville, FL",
    highlights: ["<2s p95 latency", "+30% QA accuracy", "200+ tests"],
    responsibilities: [
      "Owned end-to-end features for a patient-facing retrieval-augmented generation (RAG) application supporting a 1,000-patient surgical pilot, translating clinician feedback into Python/FastAPI services, REST APIs, and AWS integrations from design through deployment.",
      "Reduced p95 response latency to under 2 seconds by profiling asynchronous Python services, optimizing request handling, and eliminating bottlenecks across production workflows.",
      "Improved clinical question-answering accuracy by 30% across 10,000+ documents by designing retrieval, context-management, evaluation, and model-output validation workflows.",
      "Accelerated feature turnaround by 25% using Cursor and Claude Code for implementation, debugging, and refactoring, validating generated changes through 200+ automated tests and peer review before production release.",
    ],
  },
  {
    review:
      "Three years on a regulated U.S. banking platform: high-throughput Java microservices, latency tuning, CI/CD, and production on-call reliability.",
    imgPath: "/images/exp2.png",
    company: "Infosys | Client: Citizens Financial Group",
    logoText: "INFY",
    role: "Software Engineer",
    title: "Infosys - Software Engineer",
    date: "Jul 2022 - Aug 2025",
    location: "Bangalore, India",
    highlights: ["1M+ daily API calls", "850ms → <200ms p99", "-40% release cycle"],
    responsibilities: [
      "Scaled a financial account-opening platform to more than 1M daily API transactions by building Java and Spring Boot microservices with Kafka, gRPC, REST APIs, PostgreSQL, and Redis.",
      "Increased API throughput by 70% and reduced p99 latency from 850 milliseconds to under 200 milliseconds by optimizing asynchronous processing, thread pools, database queries, I/O paths, and caching.",
      "Reduced loan-approval turnaround from 3 days to under 24 hours across 50,000+ annual applications by translating client requirements into services integrating credit-bureau data and real-time eligibility logic.",
      "Reduced release cycles by 40% by expanding JUnit unit and integration testing, reviewing Java changes, and automating build, test, and deployment validation through Jenkins and GitLab CI/CD.",
      "Improved incident recovery time by 35% across 3 production environments through log analysis, service metrics, root-cause debugging, and Prometheus/Grafana monitoring.",
    ],
  },
  {
    review:
      "First industry role: frontend and API work on enterprise software, with a focus on accessibility.",
    imgPath: "/images/exp3.png",
    company: "OneAdvanced",
    logoText: "OA",
    role: "Software Engineer Intern",
    title: "OneAdvanced - Software Engineer Intern",
    date: "Feb 2022 - Jun 2022",
    location: "Bangalore, India",
    highlights: ["Accessible React", "Keyboard & screen-reader"],
    responsibilities: [
      "Improved accessibility of enterprise applications by building reusable React components and REST API integrations with keyboard navigation and screen-reader support.",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Electronic Trading Order Matching Engine",
    kicker: "Low-latency C++17 systems",
    description:
      "A multithreaded price-time-priority matching engine with 10 concurrent producers and a dedicated matcher. Flat price-tick arrays, intrusive FIFO queues, hash-indexed order lookup, and recycled node pools give O(1) insertion, cancellation, and matching per fill.",
    metric: "6.25M orders/sec · 1M orders in 160ms",
    stack: ["C++17", "Multithreading", "Lock-free queues", "Data Structures"],
    github: "https://github.com/adineshreddy/Low_Latency_Order_Matching_Engine",
  },
  {
    number: "02",
    title: "TraceHawk - Real-Time Data Monitoring Platform",
    kicker: "Distributed streaming pipeline",
    description:
      "A Go collector and 2 Python consumers across 3 Kafka partitions, with 4 explainable detectors and a React console for event evidence and timelines. Transactional checkpoints, consumer-ownership fencing, and at-least-once delivery, verified against a 108-event replay and simulated infrastructure failures.",
    metric: "At-least-once · failure-tested recovery",
    stack: ["Go", "Python", "Kafka", "PostgreSQL", "React"],
    github: "https://github.com/adineshreddy/TraceHawk",
    demo: "https://youtu.be/K9gNw44rH-c",
  },
  {
    number: "03",
    title: "SentinelLLM - AI Security Gateway",
    kicker: "Secure infrastructure for AI agents",
    description:
      "A security gateway for LLM applications, RAG pipelines, and agents built with Spring Boot and FastAPI: prompt-injection and PII inspection, signed tool-execution permits, tenant-scoped audit trails, and Redis-backed quotas. Deployed as 45 Kubernetes resources with Terraform and Calico default-deny network policies.",
    metric: "187 automated checks · 45 K8s resources",
    stack: ["Spring Boot", "FastAPI", "Redis", "Kubernetes", "Terraform"],
    github: "https://github.com/adineshreddy/SentinelLLM",
    demo: "https://youtu.be/ioEVcGnMoxo",
  },
  {
    number: "04",
    title: "Distributed Social Media Engine",
    kicker: "Actor-model concurrency",
    description:
      "A Reddit-style distributed backend in Gleam on OTP/BEAM, using actors, asynchronous messaging, and supervision trees to simulate 100,000+ concurrent users. Exposes 18 REST APIs for posts, comments, voting, subscriptions, and authentication.",
    metric: "100K+ simulated users · 5-15ms responses",
    stack: ["Gleam", "OTP/BEAM", "Actors", "REST APIs"],
    github: "https://github.com/adineshreddy/reddit_clone_part2_bonus",
  },
];

const education = [
  {
    school: "University of Florida",
    degree: "MS in Computer Science",
    gpa: "4.0/4.0",
    date: "Aug 2025 - May 2027",
  },
  {
    school: "JNTU",
    degree: "BS in Electronics and Communication Engineering",
    gpa: "8.61/10.0",
    date: "Aug 2018 - Jun 2022",
  },
];

const certifications = [
  {
    name: "AI Driven Development Lifecycle Foundations",
    issuer: "AWS Knowledge",
    badge: "AWS",
    link: "https://www.credly.com/badges/4df69925-15bf-40ed-9ffe-b1ac977f8a16/public_url",
  },
  {
    name: "Agentic AI Foundations Associate",
    issuer: "Oracle Certified",
    badge: "ORCL",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=0062EC6B5405A4262905D09B3396EBB4A53F71A4E79022C19E48EB3206BFDBAD",
  },
];

const socialImgs = [
  { name: "GitHub", link: profile.github },
  { name: "Email", link: `mailto:${profile.email}` },
  { name: "LinkedIn", link: profile.linkedin },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  socialImgs,
  techStackIcons,
  profile,
  skillGroups,
  projects,
  education,
  certifications,
  navLinks,
};

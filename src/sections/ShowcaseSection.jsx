import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { projects } from "../constants";
import TitleHeader from "../components/TitleHeader";
import "../styles/work.css";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );

      gsap.utils.toArray(".project-grid-item").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <TitleHeader
          title="Featured Engineering Projects"
          sub="Systems I've Built"
        />
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.number} className="project-grid-item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => (
  <article className="project-card work-project-card">
    <div className="project-card-top">
      <span>{project.number}</span>
      <p>{project.kicker}</p>
    </div>

    <div className="project-card-body">
      <h2>{project.title}</h2>
      <div className="project-metric">
        <small>Key result</small>
        <strong>{project.metric}</strong>
      </div>
      <p>{project.description}</p>
    </div>

    <div className="project-card-meta">
      <ul className="project-stack" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="project-link"
        >
          View on GitHub
          <span aria-hidden="true">&rarr;</span>
        </a>
      )}
    </div>
  </article>
);

export default AppShowcase;

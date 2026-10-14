import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import { education } from "../constants";
import "../styles/sections.css";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".edu-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#education",
          start: "top 75%",
        },
      }
    );
  });

  return (
    <section id="education" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="Education" sub="Academic Background" />

        <div className="edu-grid">
          {education.map((item) => (
            <article key={item.school} className="card-border edu-card">
              <div className="edu-card-top">
                <h3>{item.school}</h3>
                {item.gpa && (
                  <span className="gpa-badge">GPA {item.gpa}</span>
                )}
              </div>
              <p className="edu-degree">{item.degree}</p>
              <p className="edu-date">{item.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

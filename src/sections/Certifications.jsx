import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import { certifications } from "../constants";
import "../styles/sections.css";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".cert-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#certifications",
          start: "top 75%",
        },
      }
    );
  });

  return (
    <section id="certifications" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="Certifications" sub="Verified Credentials" />

        <ul className="cert-list">
          {certifications.map((cert) => (
            <li key={cert.name} className="card-border cert-card">
              <span className="cert-badge" aria-hidden="true">
                {cert.badge}
              </span>
              <div className="cert-body">
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-name">{cert.name}</p>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    View credential
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Certifications;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { profile, words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";
import "../styles/chrome.css";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center w-full md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Building
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt=""
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>Software Systems</h1>
              <h1>That Scale</h1>
            </div>

            <p className="hero-intro text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I'm Dinesh, an MS CS student at the University of Florida with
              3 years building Java/Kafka fintech services at Infosys, now
              shipping RAG backends with FastAPI at PrismaP.
            </p>

            <div className="hero-ctas">
              <Button
                text="See My Work"
                className="md:w-80 md:h-16 w-60 h-12"
                id="counter"
              />
              <div className="hero-secondary">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                  Download Resume
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-btn"
                >
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-btn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;

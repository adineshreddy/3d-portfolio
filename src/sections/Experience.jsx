import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import "../styles/work.css";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    // Slide each company panel in from the left as it enters the viewport
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

    // Reveal the gradient timeline by shrinking its black cover with scroll
    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    });
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="Production Systems at Scale"
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-2/6">
                  <GlowCard card={card}>
                    {card.highlights?.length > 0 && (
                      <ul className="exp-highlights" aria-label="Highlights">
                        {card.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                    <div className="company-panel-brand">
                      <div className="company-panel-mark">{card.logoText}</div>
                      <div className="min-w-0">
                        <p>{card.company}</p>
                        <span>{card.role}</span>
                      </div>
                    </div>
                  </GlowCard>
                </div>
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20 min-w-0">
                      <div className="timeline-logo">
                        <span>{card.logoText}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#839CB5] font-semibold uppercase tracking-wide">
                          {card.company}
                        </p>
                        <h1 className="font-semibold md:text-3xl text-2xl">
                          {card.role}
                        </h1>
                        <p className="exp-meta">
                          <span>{card.date}</span>
                          {card.location && (
                            <>
                              <span className="exp-meta-dot" aria-hidden="true">
                                &middot;
                              </span>
                              <span>{card.location}</span>
                            </>
                          )}
                        </p>
                        <p className="text-[#839CB5] italic">Impact</p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map((item, index) => (
                            <li key={index} className="md:text-lg text-base">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Split e.g. {value: 6, suffix: ".25M"} into target 6.25, 2 decimals, unit "M"
const parseCounter = ({ value, suffix = "" }) => {
  const [, fraction = "", unit = ""] = suffix.match(/^(\.\d+)?(.*)$/) ?? [];
  return {
    target: value + (fraction ? Number(fraction) : 0),
    decimals: fraction ? fraction.length - 1 : 0,
    unit,
  };
};

const counters = counterItems.map((item) => ({ ...item, ...parseCounter(item) }));

const AnimatedCounter = () => {
  const counterRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray(".counter-value").forEach((el, index) => {
        const { target, decimals } = counters[index];
        const state = { value: 0 };
        const render = () => {
          el.textContent = state.value.toFixed(decimals);
        };

        render();
        gsap.to(state, {
          value: target,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counterRef.current,
            start: "top center",
          },
          onUpdate: render,
        });
      });
    },
    { scope: counterRef }
  );

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counters.map((item) => (
          <div
            key={item.label}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
          >
            <div className="text-white-50 text-5xl font-bold mb-2 tabular-nums">
              <span className="sr-only">{`${item.value}${item.suffix}`}</span>
              <span aria-hidden="true">
                <span className="counter-value">
                  {item.target.toFixed(item.decimals)}
                </span>
                {item.unit}
              </span>
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;

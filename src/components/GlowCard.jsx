import { useRef } from "react";

const GlowCard = ({ card, children }) => {
  const cardRef = useRef(null);

  // Rotate the border glow to follow the cursor around the card's center
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    const angle = (Math.atan2(mouseY, mouseX) * (180 / Math.PI) + 360) % 360;
    el.style.setProperty("--start", angle + 60);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card card-border timeline-card rounded-xl md:p-10 p-6 mb-5 break-inside-avoid-column"
    >
      <div className="glow"></div>
      {card.review && (
        <p className="text-white-50 md:text-lg text-base leading-relaxed">
          {card.review}
        </p>
      )}
      {children}
    </div>
  );
};

export default GlowCard;

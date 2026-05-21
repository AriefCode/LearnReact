import { useEffect, useState } from "react";

const SECTION_IDS = ["hero", "about", "products", "testimonials"];

export default function useActiveSection() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    );

    if (elements.length === 0) return;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = "hero";
        let bestRatio = 0;

        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestRatio > 0) {
          setActiveId(bestId);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75], rootMargin: "-20% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

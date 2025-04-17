import { useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useMotionValue
} from "framer-motion";
import Button from "../common/Button";

interface StickyNavProps {
  sectionsContainerRef: React.RefObject<HTMLElement | null>;
}

// 설정값 관리
const config = {
  maxOffset: 200,
  speedMultiplier: 10,
  minReturnTime: 50,
  maxReturnTime: 300,
  spring: {
    stiffness: 500,
    damping: 30
  }
};

const StickyNav: React.FC<StickyNavProps> = ({ sectionsContainerRef }) => {
  const { scrollY } = useScroll();
  const yOffset = useMotionValue(0);
  const smoothYOffset = useSpring(yOffset, config.spring);

  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const initializeActiveSection = useCallback(() => {
    if (!sectionsContainerRef.current) return;

    const detectedSections = Array.from(
      sectionsContainerRef.current.querySelectorAll("section")
    ).filter((el) => el.id) as HTMLElement[];

    setSections(detectedSections);

    const scrollPosition = window.scrollY + window.innerHeight / 2;
    for (const section of detectedSections) {
      const { offsetTop, offsetHeight } = section;
      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        setActiveSection(section.id);
        break;
      }
    }
  }, [sectionsContainerRef]);

  useEffect(() => {
    initializeActiveSection();
  }, [initializeActiveSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionsContainerRef.current || sections.length === 0) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const { offsetTop, offsetHeight } = section;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, sectionsContainerRef]);

  const handleClick = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    const delta = latest - previous;
    const speed = Math.abs(delta);
    const moveDistance = Math.min(
      speed * config.speedMultiplier,
      config.maxOffset
    );

    yOffset.set(delta > 0 ? -moveDistance : moveDistance);

    setTimeout(
      () => {
        yOffset.set(0);
      },
      Math.max(config.minReturnTime, config.maxReturnTime - speed * 2)
    );
  });

  return (
    <motion.div
      style={{ y: smoothYOffset }}
      className="fixed top-1/2 right-5 z-10 h-fit -translate-y-1/2 transition-all"
    >
      <div className="bg-background flex flex-col gap-2 rounded-md p-1 shadow-sm">
        {sections.map(({ id }) => (
          <Button
            key={id}
            onClick={() => handleClick(id)}
            variant={activeSection === id ? "contained" : "text"}
            color={activeSection === id ? "primary" : "secondary"}
            className="px-6 py-2 text-sm"
          >
            {id}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default StickyNav;

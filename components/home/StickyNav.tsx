"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@ph-mold/ph-ui";
import clsx from "clsx";

interface Props {
  sectionsContainerRef: React.RefObject<HTMLElement | null>;
}

export default function StickyNav({ sectionsContainerRef }: Props) {
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const getCurrentSection = (detectedSections: HTMLElement[]) => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of detectedSections) {
      const { offsetTop, offsetHeight } = section;
      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        return section.id;
      }
    }

    return null;
  };

  const initializeSections = useCallback(() => {
    if (!sectionsContainerRef.current) return;

    const detectedSections = Array.from(
      sectionsContainerRef.current.querySelectorAll("section")
    ).filter((el) => el.id) as HTMLElement[];

    setSections(detectedSections);
    setActiveSection(getCurrentSection(detectedSections));
  }, [sectionsContainerRef]);

  useEffect(() => {
    initializeSections();
  }, [initializeSections]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionsContainerRef.current || sections.length === 0) return;
      const current = getCurrentSection(sections);
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, sectionsContainerRef]);

  const handleClick = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="fixed top-1/2 right-5 z-10 -translate-y-1/2">
      <div className="bg-background flex flex-col gap-2 rounded-md p-1 shadow-md">
        {sections.map(({ id }) => (
          <Button
            key={id}
            onClick={() => handleClick(id)}
            variant={activeSection === id ? "contained" : "text"}
            color={activeSection === id ? "primary" : "secondary"}
            className={clsx("px-6 py-2 text-sm", {
              "bg-gradient-to-r from-sky-300 to-blue-400": activeSection === id
            })}
          >
            {id}
          </Button>
        ))}
      </div>
    </div>
  );
}

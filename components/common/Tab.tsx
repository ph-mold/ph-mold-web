import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { TabItem } from "@/types/ui/tab";

interface TabProps {
  tabs: TabItem[];
  activeTab?: string | null;
  onChange?: (value: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  showIndicator?: boolean;
}

export default function Tab({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  className,
  tabClassName,
  activeTabClassName,
  showIndicator = true
}: TabProps) {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(
    tabs[0]?.value
  );

  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const indicatorRef = useRef<HTMLDivElement>(null);

  const isControlled =
    controlledActiveTab !== undefined && controlledActiveTab !== null;
  const activeTab = isControlled ? controlledActiveTab : uncontrolledActiveTab;

  const handleTabClick = useCallback(
    (value: string) => {
      if (!isControlled) setUncontrolledActiveTab(value);
      onChange?.(value);
    },
    [isControlled, onChange]
  );

  useEffect(() => {
    if (!showIndicator || !indicatorRef.current) return;

    const updateIndicator = () => {
      const activeTabEl = tabRefs.current[activeTab ?? ""];
      if (activeTabEl) {
        const { offsetLeft: left, offsetWidth: width } = activeTabEl;
        indicatorRef.current!.style.transform = `translateX(${left}px)`;
        indicatorRef.current!.style.width = `${width}px`;
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeTab, showIndicator, tabs]);
  return (
    <div className={clsx("relative", className)}>
      <ul className="flex gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <li
              key={tab.value}
              ref={(el) => {
                tabRefs.current[tab.value] = el;
              }}
              onClick={() => handleTabClick(tab.value)}
              className={clsx(
                "text-foreground2 relative flex cursor-pointer items-center space-x-2 px-3 py-3 text-nowrap transition hover:opacity-60",
                tabClassName,
                isActive && "text-signature font-semibold",
                isActive && activeTabClassName
              )}
            >
              {tab.icon && tab.icon}
              {tab.label}
            </li>
          );
        })}
      </ul>

      {showIndicator && (
        <div
          ref={indicatorRef}
          className="bg-signature absolute bottom-0.5 h-0.5 transition-all duration-300"
          style={{ left: 0, width: 0 }}
        />
      )}
    </div>
  );
}

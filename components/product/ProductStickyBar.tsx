"use client";

import { useStickyButtonRef } from "@/context/StickyButtonContext";
import { IGetProductSummary } from "@/types/api/product";
import { Button } from "@ph-mold/ph-ui";
import { useInView, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  summary: IGetProductSummary;
}

export default function ProductStickyBar({ summary }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useStickyButtonRef();
  const isInView = useInView(ref);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(!isInView);
    }, 100);
    return () => clearTimeout(timeout);
  }, [isInView]);

  const barHeight = 52;

  return (
    <motion.div
      initial={false}
      animate={{
        y: visible ? 0 : -barHeight,
        opacity: visible ? 1 : 0,
        height: visible ? barHeight : 0,
        pointerEvents: visible ? "auto" : "none"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="border-background2 sticky top-16 z-9 w-full overflow-hidden border-b-2 bg-white/80 backdrop-blur-md md:h-auto"
    >
      {visible && (
        <div className="mx-auto flex h-[52px] max-w-[1080px] items-center justify-between px-4 py-2 md:px-10">
          <div className="flex flex-col">
            <p className="text-foreground2 text-xs">{summary.code}</p>
            <p className="text-sm font-bold">{summary.name}</p>
          </div>
          <Button className="w-24" size="small">
            샘플요청
          </Button>
        </div>
      )}
    </motion.div>
  );
}

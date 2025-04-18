import { useDelayedRender } from "@/hooks/useDelayedRender";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

interface Props {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  minDuration?: number;
}

export default function WithSkeleton({
  isLoading,
  skeleton,
  children,
  delay = 100,
  minDuration = 500
}: Props) {
  const showSkeleton = useDelayedRender(isLoading, { delay, minDuration });

  // 최초 마운트를 판단
  const hasMounted = useRef(false);
  if (!hasMounted.current) hasMounted.current = true;

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {showSkeleton && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-1"
          >
            {skeleton}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: showSkeleton ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative z-0"
      >
        {children}
      </motion.div>
    </div>
  );
}

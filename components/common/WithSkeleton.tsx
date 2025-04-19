import { useDelayedRender } from "@/hooks/useDelayedRender";
import { AnimatePresence, motion } from "framer-motion";

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
            className="absolute inset-0 z-2"
          >
            {skeleton}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`transition-opacity duration-200 ${
          showSkeleton ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

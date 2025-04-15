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
  delay = 200,
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
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            {skeleton}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSkeleton ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-0"
      >
        {children}
      </motion.div>
    </div>
  );
}

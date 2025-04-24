import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import clsx from "clsx";
import { Button } from "@ph-mold/ph-ui";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const contentVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 }
};

export default function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [open]);

  if (typeof window === "undefined") return null;
  const isMobile = window.innerWidth <= 768;
  const container = document.getElementById("modal-root");
  if (!container) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 md:items-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
        >
          {/* 모달 콘텐츠 */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={clsx(
              "flex w-full flex-col bg-white shadow-xl",
              isMobile
                ? "absolute right-0 bottom-0 left-0 h-[80dvh] rounded-t-2xl"
                : "relative max-h-[90vh] max-w-lg rounded-2xl"
            )}
          >
            {/* 타이틀 */}
            {title && (
              <div className="border-background2 flex items-center justify-between border-b px-4 pt-4 pb-2">
                <div className="text-lg font-semibold">
                  {typeof title === "string" ? <h2>{title}</h2> : title}
                </div>
                <Button
                  onClick={onClose}
                  size="small"
                  variant="text"
                  color="secondary"
                  className="!p-2"
                >
                  <X className="size-5" />
                </Button>
              </div>
            )}

            {/* 스크롤 가능한 영역 */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    container
  );
}

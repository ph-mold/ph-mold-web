import { motion } from "framer-motion";

type SectionTitleProps = {
  title: string;
  subtitle: string;
};

export const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="mb-16 text-center">
    <motion.h2
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 text-4xl font-bold md:text-5xl"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="text-foreground2 text-lg"
    >
      {subtitle}
    </motion.p>
  </div>
);

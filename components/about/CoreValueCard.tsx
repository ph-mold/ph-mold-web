import { motion } from "framer-motion";

export type CoreValue = {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
};

type CoreValueCardProps = {
  value: CoreValue;
  index: number;
};

export const CoreValueCard = ({ value, index }: CoreValueCardProps) => (
  <motion.div
    key={value.title}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, delay: index * 0.1 }}
    className="group border-border-strong bg-background relative overflow-hidden rounded-2xl border p-8 shadow-lg transition-all duration-200 hover:shadow-xl"
  >
    <div className="relative z-10">
      <div
        className={`mb-6 inline-flex rounded-xl bg-gradient-to-r ${value.gradient} text-reverseForeground p-3`}
      >
        {value.icon}
      </div>
      <h3 className="mb-4 text-2xl font-bold">{value.title}</h3>
      <p className="text-foreground2 text-lg">{value.description}</p>
    </div>
    <div
      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
    />
  </motion.div>
);

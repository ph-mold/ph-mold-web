import { motion } from "framer-motion";
import Image from "next/image";
import { imageLoader } from "@/lib/imageLoader";
import { type Facility } from "./types";

interface Props {
  facility: Facility;
}

export function FacilityBanner({ facility }: Props) {
  return (
    <div className="relative hidden overflow-hidden rounded-2xl shadow-lg md:block">
      <div className="relative w-full">
        <motion.div
          key={facility.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            loader={imageLoader}
            src={`public/${facility.image}`}
            alt={facility.title}
            width={1200}
            height={800}
            className="w-full"
            priority
          />
        </motion.div>
      </div>
      <div className="bg-background relative p-8">
        <motion.div
          key={facility.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-foreground text-3xl font-bold">
            {facility.title}
          </h2>
          <p className="text-foreground2 mt-4 text-xl">
            {facility.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

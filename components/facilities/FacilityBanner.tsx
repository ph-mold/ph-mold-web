import { motion } from "framer-motion";
import Image from "next/image";
import { imageLoader } from "@/lib/imageLoader";
import { type Facility } from "./types";

interface Props {
  facility: Facility;
}

export function FacilityBanner({ facility }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg">
      <div className="relative w-full">
        <motion.div
          key={facility.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            loader={imageLoader}
            src={facility.image}
            alt={facility.title}
            width={1200}
            height={800}
            className="w-full"
            priority
          />
        </motion.div>
      </div>
      <div className="relative bg-white p-8">
        <motion.div
          key={facility.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">{facility.title}</h2>
          <p className="mt-4 text-xl text-gray-600">{facility.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

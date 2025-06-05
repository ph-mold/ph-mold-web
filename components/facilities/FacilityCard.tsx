import Image from "next/image";
import { imageLoader } from "@/lib/imageLoader";
import { type Facility } from "./types";

interface Props {
  facility: Facility;
  isSelected: boolean;
  onSelect: (facility: Facility) => void;
}

export function FacilityCard({ facility, isSelected, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(facility)}
      className={`group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-sm transition-all duration-200 hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="relative h-[240px] w-full">
        <Image
          loader={imageLoader}
          src={facility.image}
          alt={facility.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
          {facility.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {facility.description}
        </p>
      </div>
    </div>
  );
}

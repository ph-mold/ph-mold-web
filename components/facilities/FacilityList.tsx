import { type Facility } from "./types";
import { FacilityCard } from "./FacilityCard";

interface Props {
  facilities: Facility[];
  selectedFacility: Facility;
  onSelectFacility: (facility: Facility) => void;
}

export function FacilityList({
  facilities,
  selectedFacility,
  onSelectFacility
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {facilities.map((facility) => (
        <FacilityCard
          key={facility.id}
          facility={facility}
          isSelected={selectedFacility.id === facility.id}
          onSelect={onSelectFacility}
        />
      ))}
    </div>
  );
}

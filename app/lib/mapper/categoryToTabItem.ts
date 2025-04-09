import { TabItem } from "@/components/common/Tab";
import type { IGetRootCategory } from "@/types/category";

export function mapCategoriesToTabItems(
  categories: IGetRootCategory[]
): TabItem[] {
  return [
    { label: "전체", value: "all" },
    ...categories.map((c) => ({
      label: c.name,
      value: c.key
    }))
  ];
}

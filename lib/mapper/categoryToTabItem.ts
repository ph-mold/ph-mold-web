import type { IGetRootCategory } from "@/types/api/category";
import { TabItem } from "@/types/ui/tab";

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

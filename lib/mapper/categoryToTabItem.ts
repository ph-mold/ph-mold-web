import type { IGetCategory } from "@/types/api/category";
import { TabItem } from "@/types/ui/tab";
import { ReactNode } from "react";

export function mapCategoriesToTabItems(categories: IGetCategory[]): TabItem[] {
  return [
    { label: "전체", value: "all" },
    ...categories.map((c) => ({
      label: c.name,
      value: c.key
    }))
  ];
}

export function mapCategoriesToSubTabItems(
  categories: IGetCategory[],
  iconCallBackFn: (image_url?: string) => ReactNode
): TabItem[] {
  return [
    { label: "전체", value: "all", icon: iconCallBackFn() },
    ...categories.map((c) => ({
      label: c.name,
      value: c.key,
      icon: iconCallBackFn(c.imageUrl)
    }))
  ];
}

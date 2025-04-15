import { API } from "@/lib/constants/api";
import { fetcher } from "../fetcher";
import { IGetCategory } from "@/types/api/category";

export async function getRootCategory(): Promise<IGetCategory[]> {
  return (await fetcher(API.CATEGORIES.GET, { cache: "force-cache" })) ?? [];
}

export const GET_CATEGORY_BY_PARENT_KEY = "getCategoryByParentKey";
export async function getCategoryByParentKey(
  parentKey: string
): Promise<IGetCategory[]> {
  return (
    (await fetcher(`${API.CATEGORIES.GET_BY_PARENT_KEY}/${parentKey}`, {
      cache: "force-cache"
    })) ?? []
  );
}

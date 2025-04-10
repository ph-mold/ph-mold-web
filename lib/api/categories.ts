import { API } from "@/lib/constants/api";
import { fetcher } from "../fetcher";
import { IGetCategory } from "@/types/api/category";

export async function getRootCategory(): Promise<IGetCategory[] | undefined> {
  return fetcher(API.CATEGORIES.GET, { cache: "force-cache" });
}

export async function getCategoryByParentKey(
  parentKey: string
): Promise<IGetCategory[] | undefined> {
  return fetcher(API.CATEGORIES.GET_BY_PARENT_KEY(parentKey), {
    cache: "force-cache"
  });
}

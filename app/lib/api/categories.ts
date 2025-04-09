import { API } from "@/constants/api";
import { fetcher } from "../fetcher";
import { IGetRootCategory } from "@/types/category";

export async function getRootCategory(): Promise<IGetRootCategory[]> {
  return fetcher(API.CATEGORIES.GET, { cache: "force-cache" });
}

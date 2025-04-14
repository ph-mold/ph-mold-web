import { IGetProduct } from "@/types/api/product";
import { fetcher } from "../fetcher";
import { API } from "../constants/api";

export async function getProductsByCategory(
  categoryKey: string
): Promise<IGetProduct[] | undefined> {
  return fetcher(API.PRODUCTS.GET_BY_CATEGORY + `?category=${categoryKey}`);
}

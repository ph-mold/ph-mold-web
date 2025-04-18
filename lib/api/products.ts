import { IGetProduct } from "@/types/api/product";
import { fetcher } from "../fetcher";
import { API } from "../constants/api";

export const GET_PRODUCTS_BY_CATEGORY = "getProductsByCategory";
export async function getProductsByCategory(
  categoryKey: string
): Promise<IGetProduct[]> {
  return (
    (await fetcher(
      API.PRODUCTS.GET_BY_CATEGORY + `?category=${categoryKey}`
    )) ?? []
  );
}

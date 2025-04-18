import {
  IGetProduct,
  IGetProductInfo,
  IGetProductSummary
} from "@/types/api/product";
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

export const GET_PRODUCT_SUMMARY_BY_KEY = "getProductSummaryByKey";
export async function getProductSummaryByKey(
  key: string
): Promise<IGetProductSummary> {
  return (await fetcher(API.PRODUCTS.GET_SUMMARY_BY_KEY(key))) ?? {};
}

export const GET_PRODUCT_INFO_BY_KEY = "getProductInfoByKey";
export async function getProductInfoByKey(
  key: string
): Promise<IGetProductInfo> {
  return (await fetcher(API.PRODUCTS.GET_INFO_BY_KEY(key))) ?? {};
}

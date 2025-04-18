export const MOCK_URL = "/api";

export const API = {
  CATEGORIES: {
    GET: `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
    GET_BY_PARENT_KEY: `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
  },
  PRODUCTS: {
    GET_BY_CATEGORY: `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    GET_SUMMARY_BY_KEY: (key: string) =>
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${key}/summary`,
    GET_INFO_BY_KEY: (key: string) =>
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${key}/info`
  },
  PRODUCT_CATEGORIES: {
    GET: `${MOCK_URL}/product-categories`
  }
};

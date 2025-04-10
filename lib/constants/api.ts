export const MOCK_URL = "/api";

export const API = {
  CATEGORIES: {
    GET: `${process.env.API_BASE_URL}/categories`,
    GET_BY_PARENT_KEY: (key: string) =>
      `${process.env.API_BASE_URL}/categories/${key}`
  },
  PRODUCT_CATEGORIES: {
    GET: `${MOCK_URL}/product-categories`
  }
};

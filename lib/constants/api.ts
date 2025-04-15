export const MOCK_URL = "/api";

export const API = {
  CATEGORIES: {
    GET: `/categories`,
    GET_BY_PARENT_KEY: `/categories`
  },
  PRODUCTS: {
    GET_BY_CATEGORY: `/products`
  },
  PRODUCT_CATEGORIES: {
    GET: `${MOCK_URL}/product-categories`
  }
};

export const MOCK_URL = "/api";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API = {
  CATEGORIES: {
    GET: `${API_BASE}/categories`,
    GET_BY_PARENT_KEY: (key: string) => `${API_BASE}/categories/${key}`
  },
  PRODUCTS: {
    GET_BY_CATEGORY: (key: string) => `${API_BASE}/products?category=${key}`,
    GET_SUMMARY_BY_KEY: (key: string) => `${API_BASE}/products/${key}/summary`,
    GET_INFO_BY_KEY: (key: string) => `${API_BASE}/products/${key}/info`,
    GET_IMAGES_BY_KEY: (key: string) => `${API_BASE}/products/${key}/images`,
    GET_DETAIL_BY_KEY: (key: string) => `${API_BASE}/products/${key}/detail`
  },
  SAMPLE_REQUESTS: {
    CREATE: `${API_BASE}/sample-requests`
  },
  PRODUCT_CATEGORIES: {
    GET: `${MOCK_URL}/product-categories`
  }
};

import {
  IInquiryFormValues,
  IPaginatedInquiriesResponse
} from "@/types/api/inquiry";
import { fetcher } from "../fetcher";
import { API } from "../constants/api";

export const CREATE_INQUIRY = "createInquiry";
export const createInquiry = async (data: IInquiryFormValues) => {
  await fetcher(API.INQUIRIES.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const GET_INQUIRIES = "getInquiries";
export const getInquiries = async (
  page: number = 1,
  limit: number = 5
): Promise<IPaginatedInquiriesResponse | undefined> => {
  const data = await fetcher<IPaginatedInquiriesResponse>(
    `${API.INQUIRIES.GET}?page=${page}&limit=${limit}`
  );
  return data;
};

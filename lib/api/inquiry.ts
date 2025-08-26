import {
  IInquiryFormValues,
  IInquiryWithoutPassword,
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

export const POST_INQUIRY_DETAIL = "postInquiryDetail";
export const postInquiryDetail = async (
  inquiryId: number,
  password: string
): Promise<IInquiryWithoutPassword | undefined> => {
  const data = await fetcher<IInquiryWithoutPassword>(
    `${API.INQUIRIES.GET_DETAIL(inquiryId)}`,
    {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return data;
};

export const POST_INQUIRY_REPLY = "postInquiryReply";
export const postInquiryReply = async (
  inquiryId: number,
  content: string,
  password: string
) => {
  await fetcher(API.INQUIRIES.POST_REPLY(inquiryId), {
    method: "POST",
    body: JSON.stringify({ content, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

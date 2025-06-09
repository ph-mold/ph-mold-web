import { IInquiryFormValues } from "@/types/api/inquiry";
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

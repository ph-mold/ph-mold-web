export interface IInquiryFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  detailedAddress: string;
  agree: boolean;
  remarks?: string;
  password: string;
}

export interface IReply {
  id: number;
  inquiryId: number;
  assignedUserId?: number;
  replyType: "COMPANY" | "USER";
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInquiry extends IInquiryFormValues {
  id: number;
  createdAt: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  replies?: IReply[];
}

export type IInquiryWithoutPassword = Omit<IInquiry, "password">;

export interface IPaginatedInquiriesResponse {
  items: IInquiry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPasswordModalFormValues {
  password: string;
}

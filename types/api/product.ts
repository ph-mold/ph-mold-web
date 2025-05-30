export interface IProductCategory {
  name: string;
  desc: string;
  image: string;
  link: string;
}

export interface IGetProduct extends IGetProductSummary {
  tags: ITag[];
}

export interface IGetProductSummary {
  id: number;
  key: string;
  code: string;
  name: string;
  mainCategory: string;
  subCategory: string;
  material: string;
  createdAt: Date;
  thumbnailImageUrl: string;
  origin: string;
  moq: number;
}

export interface IGetProductInfo extends IGetProduct {
  specs: ISpec[];
}

export interface IGetProductImage {
  id: number;
  url: string;
  isThumbnail: number;
  sortOrder: number;
  createdAt: Date;
}

export interface ISpec {
  id: number;
  value: string;
  specType: {
    id: number;
    key: string;
    label: string;
    unit: string;
  };
}
export interface IGetProductDetail {
  detail: string;
}

export interface ITag {
  id: number;
  key: string;
  name: string;
}

export interface IRequestSampleFormValues {
  productId: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  detailedAddress: string;
  quantity: string;
  remarks: string;
  agree: boolean;
}

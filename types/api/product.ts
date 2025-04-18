export interface IProductCategory {
  name: string;
  desc: string;
  image: string;
}

export interface IGetProduct {
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

export interface IGetProductInfo {
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
  tags: ITag[];
  specs: ISpec[];
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

export interface ITag {
  id: number;
  key: string;
  name: string;
}

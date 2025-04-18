export interface IProductCategory {
  name: string;
  desc: string;
  image: string;
}

export interface IGetProduct {
  id?: number;
  key?: string;
  code?: string;
  name?: string;
  mainCategory?: string;
  subCategory?: string;
  material?: string;
  createdAt?: Date;
  thumbnailImageUrl?: string;
  origin?: string;
  moq?: number;
  tags?: ITag[];
}

export interface IGetProductSummary {
  id?: number;
  key?: string;
  code?: string;
  name?: string;
  mainCategory?: string;
  subCategory?: string;
  material?: string;
  createdAt?: Date;
  thumbnailImageUrl?: string;
  origin?: string;
  moq?: number;
}

export interface ITag {
  id: number;
  key: string;
  name: string;
}

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
  tags: ITag[];
}

export interface ITag {
  id: number;
  key: string;
  name: string;
}

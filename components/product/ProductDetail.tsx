import useSWR from "swr";
import { IGetProductDetail } from "@/types/api/product";
import {
  GET_PRODUCT_DETAIL_BY_KEY,
  getProductDetailByKey
} from "@/lib/api/products";
import { notFound } from "next/navigation";
import WithSkeleton from "../common/WithSkeleton";
import Markdown from "../common/markdown/Markdown";
import ProductDetailSkeleton from "./ProductDetail.skeleton";

interface Props {
  productKey: string;
}

export default function ProductDetail({ productKey }: Props) {
  const { data, isLoading, error } = useSWR<IGetProductDetail | undefined>(
    [GET_PRODUCT_DETAIL_BY_KEY, productKey],
    () => getProductDetailByKey(productKey)
  );
  if (error) {
    notFound();
  }

  return (
    <WithSkeleton isLoading={isLoading} skeleton={<ProductDetailSkeleton />}>
      {data && <Markdown data={data.detail} />}
    </WithSkeleton>
  );
}

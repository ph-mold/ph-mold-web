import useSWR from "swr";
import { IGetProductDetail } from "@/types/api/product";
import {
  GET_PRODUCT_DETAIL_BY_KEY,
  getProductDetailByKey
} from "@/lib/api/products";
import { notFound } from "next/navigation";
import Markdown from "../common/markdown/Markdown";
import ProductDetailSkeleton from "./ProductDetail.skeleton";
import ProductDetailTabs from "./ProductDetailTabs";
import { WithSkeleton } from "@ph-mold/ph-ui";

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
    <section id="detail">
      <ProductDetailTabs activeTab="detail" />
      <WithSkeleton isLoading={isLoading} skeleton={<ProductDetailSkeleton />}>
        {data && <Markdown data={data.detail} />}
      </WithSkeleton>
    </section>
  );
}

import { motion } from "framer-motion";
import { IProductCategory } from "@/types/api/product";
import useSWR from "swr";
import { API } from "@/lib/constants/api";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@ph-mold/ph-ui";
import Image from "next/image";
import { imageLoader } from "@/lib/imageLoader";

export default function ProductCategorySection() {
  const { data } = useSWR<IProductCategory[]>(API.PRODUCT_CATEGORIES.GET);

  return (
    <section id="제품" className="flex h-fit flex-col gap-8 py-20">
      <div className="mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-4xl font-bold md:text-5xl"
        >
          제품
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-foreground2 text-lg"
        >
          우리의 제품을 소개합니다
        </motion.p>
      </div>

      <div className="mx-4 grid max-w-[1080px] grid-cols-1 gap-6 md:mx-auto md:grid-cols-2">
        {data?.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.1 }}
          >
            <Link href={product.link}>
              <div className="group border-background2 relative flex h-full cursor-pointer flex-col items-center gap-6 overflow-hidden rounded-2xl border bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl sm:flex-row">
                <div className="bg-background2 w-full flex-none rounded-lg sm:h-40 sm:w-40">
                  <Image
                    loader={imageLoader}
                    src={`${product.image}`}
                    alt={product.name}
                    width={240}
                    height={240}
                    className="mx-auto transition-all duration-150 group-hover:scale-105"
                  />
                </div>
                <div className="flex h-full flex-auto flex-col justify-center gap-2">
                  <p className="flex-none text-xl font-semibold">
                    {product.name}
                  </p>
                  <p className="text-foreground2 flex-initial overflow-y-hidden">
                    {product.desc}
                  </p>
                </div>
                <div className="absolute top-0 left-0 z-1 size-full overflow-x-hidden rounded-lg bg-black/5 opacity-0 transition-all duration-100 group-hover:opacity-100">
                  <PackageSearch className="strock-foreground2 absolute top-10 left-full size-5 transform opacity-0 transition-all duration-100 group-hover:-translate-x-10 group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <Link href="/products" className="mx-auto mt-8">
        <Button
          variant="outlined"
          startIcon={<PackageSearch className="size-5" />}
        >
          제품 전체보기
        </Button>
      </Link>
    </section>
  );
}

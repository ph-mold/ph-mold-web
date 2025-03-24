"use client";
import Image from "next/image";

interface ProductGridProps {
  products: { id: string; name: string; image: string }[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit mx-auto">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-md min-w-[200px] w-auto h-fit flex flex-col  cursor-pointer bg-[#f1f1f1]"
        >
          <div className="size-[160px] mx-auto">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="hover:scale-125 transition duration-300 size-full"
            />
          </div>
          <p className="text-center text-md font-semibold mb-4">
            {product.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

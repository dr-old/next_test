"use client";

import Image from "next/image";
import { ProductProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { createSeoUrl } from "@/utils/helpers";

interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const seoUrl = createSeoUrl(product.title);

  const handleClick = () => {
    router.push(`/product/${product.id}-${seoUrl}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800/50  rounded-2xl p-4 hover:shadow-xl transition-shadow cursor-pointer">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={250}
        height={250}
        className="w-full h-56 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold mt-4">{product.title}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-indigo-600 font-semibold mt-2">Rp {product.price}</p>
    </div>
  );
};

export default ProductCard;

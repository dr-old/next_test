"use client";

import Image from "next/image";
import { Product } from "@/utils/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Link href={`/product/${product.id}`} legacyBehavior>
      <div className="bg-white dark:bg-gray-800/50 shadow-md rounded-2xl p-4 hover:shadow-xl transition-shadow cursor-pointer">
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
    </Link>
  );
};

export default ProductCard;

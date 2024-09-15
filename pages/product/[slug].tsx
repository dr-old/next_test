import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/utils/types";

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`https://dummyjson.com/products/${slug}`);
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="py-10">
      <div className="container mx-auto p-6 rounded-3xl bg-slate-100 text-gray-800 dark:bg-gray-900 dark:text-white">
        <div className="flex flex-col items-center">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className="w-full max-w-lg object-cover rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-6">{product.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            {product.description}
          </p>
          <p className="text-indigo-600 dark:text-indigo-400 font-semibold mt-2">
            Rp {product.price}
          </p>
          <p className="text-green-500 dark:text-green-400 font-semibold mt-2">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

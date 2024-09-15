import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ProductDetail } from "@/utils/types";
import Header from "@/components/Header";
import ActivityIndicator from "@/components/Loading";

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <div className="container my-10 mx-auto rounded-3xl bg-slate-100 text-gray-800 dark:bg-gray-900 dark:text-white">
      <Header title="Details" back={true} />
      {loading ? (
        <div className="py-10 px-6">
          <ActivityIndicator />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:space-x-6 py-10 px-6">
          {/* Image Carousel */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              <Image
                src={selectedImage || product!.images[0]}
                alt={product!.title}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              {product!.images.map((img: string) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-24 h-24  ${
                    selectedImage === img || product!.images[0] === img
                      ? "border-2 border-indigo-600"
                      : "border border-gray-300"
                  } rounded-lg overflow-hidden `}>
                  <Image
                    src={img}
                    alt={product!.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="flex-1 mt-6 lg:mt-0 bg-white dark:bg-gray-800/50 rounded-2xl px-8 py-6">
            <h1 className="text-3xl font-bold mb-2">{product!.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {product!.description}
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-2">
              $ {product!.price.toFixed(2)}
            </p>
            <p className="text-green-500 dark:text-green-400 font-semibold mb-2">
              {product!.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {product!.category}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">Brand:</span> {product!.brand}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">SKU:</span> {product!.sku}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">Weight:</span> {product!.weight}g
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">Dimensions:</span>{" "}
              {product!.dimensions.width} x {product!.dimensions.height} x{" "}
              {product!.dimensions.depth} mm
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">Warranty:</span>{" "}
              {product!.warrantyInformation}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">Shipping:</span>{" "}
              {product!.shippingInformation}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">Return Policy:</span>{" "}
              {product!.returnPolicy}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-semibold">Minimum Order Quantity:</span>{" "}
              {product!.minimumOrderQuantity}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

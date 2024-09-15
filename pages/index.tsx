"use client";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ActivityIndicator from "../components/Loading";
import Header from "../components/Header";
import { Product } from "@/utils/types";

async function fetchProducts(
  skip: number,
  limit: number = 10
): Promise<Product[]> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,description,category,thumbnail`
  );
  const data = await res.json();
  return data.products;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(true);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      setLoading(true);
      const skip = (currentPage - 1) * productsPerPage;
      const fetchedProducts = await fetchProducts(skip, productsPerPage);
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchAndSetProducts();
  }, [currentPage]);

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div
      className={"dark:bg-gray-900 dark:text-white bg-slate-100 text-gray-800"}>
      <Header title="Product List" back={false} />
      <div className="container mx-auto py-10">
        {/* Filter and Sort */}
        <div className="flex items-center justify-between mb-6">
          <select
            className="border border-gray-200 p-2 rounded-lg dark:bg-gray-800 dark:border-gray-800"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
          </select>

          <select
            className="border border-gray-200 p-2 rounded-lg dark:bg-gray-800 dark:border-gray-800"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid or Loading Indicator */}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}>
            Previous
          </button>

          <span className="text-gray-600">Page {currentPage}</span>

          <button
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

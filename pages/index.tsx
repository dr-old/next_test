"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import ActivityIndicator from "../components/Loading";
import Header from "../components/Header";
import { ProductProps } from "@/utils/types";
import Head from "next/head";
import { seoTitle } from "@/utils/helpers";

async function fetchProducts(
  skip: number,
  limit: number = 10
): Promise<ProductProps[]> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,description,category,thumbnail`
  );
  const data = await res.json();
  return data.products;
}

const Home = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const observer = useRef<IntersectionObserver | null>(null);
  const productsPerPage = 10;

  useEffect(() => {
    fetchAndSetProducts();
  }, [currentPage, selectedCategory, sortOrder]);

  const fetchAndSetProducts = async () => {
    setLoading(true);
    const skip = (currentPage - 1) * productsPerPage;
    const fetchedProducts = await fetchProducts(skip, productsPerPage);

    if (fetchedProducts.length < productsPerPage) {
      setHasMore(false);
    }

    setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
    setLoading(false);
  };

  // Handle filtering and sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Filter by category
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;

        // Filter by search query (match title or description)
        const matchesSearchQuery =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearchQuery;
      })
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [products, selectedCategory, sortOrder, searchQuery]);

  // Infinite scroll logic using IntersectionObserver
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="container my-10 mx-auto rounded-3xl bg-slate-100 text-gray-800 dark:bg-gray-900 dark:text-white">
      <Head>
        <title>{seoTitle("List Product", "", "EcommerceSite")}</title>
        <meta name="description" content={"EcommerceSite"} />
      </Head>

      <Header title="Product List" back={false} />
      {/* Search Input */}
      <div className="flex flex-col py-10 px-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          placeholder="Search products..."
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-800"
        />
      </div>
      <div className="flex flex-col py-10 px-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            if (filteredProducts.length === index + 1) {
              return (
                <div ref={lastProductRef} key={index}>
                  <ProductCard product={product} />
                </div>
              );
            } else {
              return <ProductCard key={index} product={product} />;
            }
          })}
        </div>

        {/* Loading Indicator */}
        {loading && <ActivityIndicator />}
      </div>
    </div>
  );
};

export default Home;

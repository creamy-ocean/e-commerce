import React, { useEffect, useState, memo } from "react";
import { getProducts } from "../database/firebase";
import { useQuery } from "@tanstack/react-query";
import Product from "./Product";

const Products = memo(function Products() {
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery(["products"], getProducts);

  // const [products, setProducts] = useState({});

  // useEffect(() => {
  //   (async function fetchProducts() {
  //     const products = await getProducts();
  //     setProducts(products);
  //   })();
  // }, []);

  console.log(products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          상품 목록
        </h2>
        {isLoading && (
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            상품을 가져오는 중입니다
          </h2>
        )}
        {isError && (
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            상품을 가져오는 중 문제가 발생했습니다
          </h2>
        )}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
});

export default Products;

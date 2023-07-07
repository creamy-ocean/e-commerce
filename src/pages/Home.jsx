import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Products from "./Products";
import useProducts from "../hooks/useProducts";

export default function Home() {
  const {
    productsObj: { data: products },
  } = useProducts();

  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? products.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === products.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(next, 4000);
    return () => clearInterval(slideInterval);
  }, [products]);

  return (
    <div className="w-full h-1/2 bg-gray-100 relative">
      <div className="absolute inset-0 p-40 flex items-center justify-between">
        <ChevronLeftIcon
          onClick={prev}
          className="w-10 h-10 text-gray-300 cursor-pointer"
        />
        <ChevronRightIcon
          onClick={next}
          className="w-10 h-10 text-gray-300 cursor-pointer"
        />
      </div>
      <div className="relative max-w-xs m-auto overflow-hidden rounded-lg">
        <div
          className="flex transition-transform ease-in-out duration-1000"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {products &&
            products.map((product) => {
              return (
                <img
                  src={product.imgSrc}
                  alt={product.name}
                  className="cover"
                />
              );
            })}
        </div>
        <div className="absolute bottom-8 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {products &&
              products.map((product, index) => {
                return (
                  <div
                    onClick={() => setCurr(index)}
                    className={`transition-all w-3 h-3 bg-white rounded-full cursor-pointer ${
                      curr === index ? "p-2" : "bg-opacity-50"
                    }`}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <Products />
    </div>
  );
}

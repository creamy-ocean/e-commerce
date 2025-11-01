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
      <div className="absolute inset-0 px-80 flex items-center justify-between">
        <ChevronLeftIcon
          onClick={prev}
          className="w-10 h-10 text-gray-300 cursor-pointer"
        />
        <ChevronRightIcon
          onClick={next}
          className="w-10 h-10 text-gray-300 cursor-pointer"
        />
      </div>
      <div className="h-full relative max-w-xs m-auto overflow-hidden rounded-lg">
        <div
          className="flex h-full transition-transform ease-in-out duration-1000"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {products &&
            products.map((product) => {
              return (
                <img
                  key={product.id}
                  src={product.imgSrc}
                  alt={product.name}
                  className="w-full h-full object-cover flex-shrink-0"
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
                    key={product.id}
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
      <footer className="w-100 h-36 flex justify-center items-center text-gray-500">
        <a
          href="https://www.flaticon.com/free-icons/online-shop"
          title="online shop icons"
        >
          Online shop icons created by Royyan Wijaya - Flaticon
        </a>
      </footer>
    </div>
  );
}

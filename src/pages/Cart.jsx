import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../database/firebase";
import { useAuthContext } from "../context/AuthContext";
import ProductCard from "./CartProduct";
import CartPrice from "./CartPrice";

export default function Cart() {
  const { uid } = useAuthContext();

  const {
    isLoading,
    isError,
    data: products,
  } = useQuery(["cart"], () => getCart(uid));

  if (isLoading)
    return (
      <div className="w-full flex justify-center">
        <h2>장바구니를 불러오는 중입니다</h2>
      </div>
    );

  const totalPrice =
    products &&
    products.reduce(
      (acc, curr) => acc + parseInt(curr.price) * curr.quantity,
      0
    );

  return (
    <div className="w-full flex justify-center">
      {isError && <h2>장바구니를 불러오는 중 문제가 발생했습니다</h2>}
      {products && products.length > 0 ? (
        <div className="w-full flex justify-center">
          <div className="w-1/2">
            <div className="h-full bg-white shadow-xl">
              <div className="overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    장바구니
                  </span>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          uid={uid}
                          product={product}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <CartPrice
                totalPrice={totalPrice}
                uid={uid}
                products={products}
              />
            </div>
          </div>
        </div>
      ) : (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              장바구니가 비어 있습니다😓
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              마음에 드는 상품을 담아보세요
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/products"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                상품 보러 가기
              </Link>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

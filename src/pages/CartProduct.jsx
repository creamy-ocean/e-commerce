import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { addOrUpdateCart, removeFromCart } from "../database/firebase";

export default function ProductCard({ uid, product, purchased }) {
  const handleMinus = () => {
    if (product.quantity < 2) return;
    addOrUpdateCart(uid, { ...product, quantity: product.quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateCart(uid, { ...product, quantity: product.quantity + 1 });
  };
  const handleDelete = () => {
    removeFromCart(uid, product.id);
  };

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.imgSrc}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a>{product.name}</a>
            </h3>
            <p className="ml-4">{product.price}</p>
          </div>
        </div>
        <p className="uppercase text-sm text-gray-500">{product.options}</p>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500 flex justify-center">
            수량
            {!purchased ? (
              <>
                <MinusIcon
                  onClick={handleMinus}
                  className="w-5 h-5 ml-2 mr-2 p-1 bg-gray-100 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                />
                {product.quantity}
                <PlusIcon
                  onClick={handlePlus}
                  className="w-5 h-5 ml-2 p-1 bg-gray-100 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                />
              </>
            ) : (
              <p className="ml-1">{product.quantity}</p>
            )}
          </div>
          {!purchased && (
            <div className="flex">
              <button
                type="button"
                onClick={handleDelete}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

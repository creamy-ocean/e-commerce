import React from "react";
import { useNavigate } from "react-router-dom";

export default function Product({
  product,
  product: { id, name, category, price, imgSrc },
}) {
  const navigate = useNavigate();
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={imgSrc}
          alt={name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a
              onClick={() => {
                console.log(product);
                navigate(`/products/${id}`, { state: { product } });
              }}
            >
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price}&#8361;</p>
      </div>
    </div>
  );
}

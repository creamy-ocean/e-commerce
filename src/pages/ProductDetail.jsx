import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateCart } from "../database/firebase";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { uid } = useAuthContext();

  const {
    state: {
      product: { id, name, category, price, options, desc, imgSrc },
    },
  } = useLocation();
  const [selected, setSelected] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    const product = { id, name, price, options: selected, quantity: 1 };
    addOrUpdateCart(uid, product);
  };

  return (
    <div className="bg-white w-full">
      <div className="pt-6">
        <nav aria-label="Breadcrumb" className="w-2/3 m-auto">
          <div className="flex items-center">
            <a className="mr-2 text-sm font-medium text-gray-500">{category}</a>
            <svg
              width={16}
              height={20}
              viewBox="3 0 16 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-4 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
            <span className="text-sm">
              <a aria-current="page" className="font-medium text-gray-500">
                {name}
              </a>
            </span>
          </div>
        </nav>

        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="flex justify-center items-center">
            <img src={imgSrc} alt={name} className="w-1/2" />
          </div>
          <div className="lg:border-l-2 lg:border-l-gray-100 pl-6 pt-6 pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {name}
            </h1>
            <div className="pt-6">
              <h3 className="sr-only">상품 가격</h3>
              <p className="text-base text-gray-900">{price}&#8361;</p>
            </div>
            <div className="pt-6 pb-6">
              <h3 className="sr-only">상품 설명</h3>
              <p className="text-base text-gray-900">{desc}</p>
            </div>
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">사이즈</h3>
              </div>
              <RadioGroup
                value={selected}
                onChange={setSelected}
                className="mt-4"
              >
                <RadioGroup.Label className="sr-only">
                  사이즈를 골라주세요
                </RadioGroup.Label>
                <div className="grid grid-cols-5 gap-5 sm:grid-cols-5 lg:grid-cols-5">
                  {options.length > 0 &&
                    options.map((option) => (
                      <RadioGroup.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          classNames(
                            (active ? "ring-2 ring-blue-500" : "",
                            "cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6")
                          )
                        }
                      >
                        {({ checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {option}
                            </RadioGroup.Label>
                            <span
                              className={classNames(
                                checked
                                  ? "border-blue-500 border-2"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-md"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                </div>
              </RadioGroup>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClick}
                  className="rounded-md bg-blue-600 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  장바구니에 담기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

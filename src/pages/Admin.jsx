import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import useProducts from "../hooks/useProducts";

export default function Admin() {
  const [values, setValues] = useState({ category: "상의" });
  const [dragActive, setDragActive] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [toast, setToast] = useState(false);
  const { addProduct } = useProducts();

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [toast]);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      console.log("drag!!");
      setDragActive(true);
    } else if (e.type === "dragleave") {
      console.log("drag leave!!");
      setDragActive(false);
    }
  };

  const handleFileChange = function (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e) {
    const { name, value } = e.target;
    if (name === "image") {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFileChange(e.target.files[0]);
        setValues((prev) => ({
          ...prev,
          image: e.target.files[0],
        }));
      }
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    addProduct.mutate(values, {
      onSuccess: () => {
        setValues({});
        setToast(true);
      },
    });
  };

  return (
    <form className="flex justify-center" onSubmit={handleSubmit}>
      <div className="space-y-10 w-1/3">
        <div className="border-b border-gray-900/10 pb-12 pt-6">
          <h2 className="text-lg font-semibold leading-7 text-gray-900 text-center">
            관리자 페이지
          </h2>
          <p className="border-b border-gray-900/10 mt-1 text-sm leading-6 text-gray-600 text-center pb-8">
            새로운 상품을 추가할 수 있습니다
          </p>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                상품명
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={values.name}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="상품명을 입력하세요"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                상품 카테고리
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  onChange={handleChange}
                  value={values.category}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>상의</option>
                  <option>하의</option>
                  <option>액세서리</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="price"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                상품 가격
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">&#8361;</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  onChange={handleChange}
                  value={values.price}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="options"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                상품 옵션
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    name="options"
                    id="options"
                    onChange={handleChange}
                    value={values.options}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="상품 옵션을 입력하세요(예: S, M, L)"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="desc"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                상품 설명
              </label>
              <div className="mt-2">
                <textarea
                  id="desc"
                  name="desc"
                  rows={3}
                  onChange={handleChange}
                  value={values.desc}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="상품 설명을 입력하세요"
                  required
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="image"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                상품 사진
              </label>
              <div
                className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                  dragActive ? "bg-slate-50" : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center flex justify-center flex-col items-center">
                  {imageSrc ? (
                    <img src={imageSrc} alt="product image" className="w-1/2" />
                  ) : (
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer font-semibold text-blue-600 hover:text-blue-500"
                    >
                      <span>클릭해서 업로드</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        className="sr-only"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <p className="pl-1">하거나 드래그 앤 드롭 하세요</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG 이미지 업로드 가능
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {toast && (
          <div className="flex justify-center">
            <div
              id="toast-success"
              className="flex items-center w-1/2 p-4 text-gray-500 bg-white rounded-lg shadow"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">체크 아이콘</span>
              </div>
              <div className="ml-3 text-sm font-normal">
                상품이 성공적으로 추가되었습니다
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-end pb-10">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            추가하기
          </button>
        </div>
      </div>
    </form>
  );
}

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { getCart } from "../database/firebase";

export default function CartStatus() {
  const { uid } = useAuthContext();

  const { data: products } = useQuery(["cart"], () => getCart(uid));
  return (
    <Link to="cart" className="mr-4 mt-2 relative">
      <ShoppingCartIcon className="h-8 w-8 text-gray-600" />
      <p className="w-5 h-5 absolute -top-1 -right-1 bg-blue-500 text-center rounded-full text-white leading-tight">
        {products && products.length}
      </p>
    </Link>
  );
}

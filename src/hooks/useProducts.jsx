import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts as getAllProducts,
  addProduct as addNewProduct,
} from "../database/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsObj = useQuery(["products"], getAllProducts);

  const addProduct = useMutation((product) => addNewProduct(product), {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return { productsObj, addProduct };
}

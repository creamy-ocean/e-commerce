import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import {
  addOrUpdateCart,
  getCart,
  removeFromCart as removeProductFromCart,
} from "../database/firebase";

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartObj = useQuery(["cart"], () => getCart(uid));

  const addOrUpdateToCart = useMutation(
    (product) => addOrUpdateCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );

  const removeFromCart = useMutation(
    (productId) => removeProductFromCart(uid, productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );

  return { cartObj, addOrUpdateToCart, removeFromCart };
}

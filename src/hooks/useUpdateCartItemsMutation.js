import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "@/constants/API.js";
import cartAPI from "@/api/cartAPI.js";

function useUpdateCartItemsMutation() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    [API.KEYS.UPDATE_CART_ITEMS],
    async ({ items }) => {
      await cartAPI.updateCartItems({ items });
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(API.KEYS.GET_CART_ITEMS);
      },
    }
  );

  return { mutate };
}

export default useUpdateCartItemsMutation;

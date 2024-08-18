import { createSlice } from "@reduxjs/toolkit";

type TAddToCartProducts = {
  id: string;
  quantity: number;
  maxQuantity: number;
};
export type CounterState = {
  products: TAddToCartProducts[];
};

const initialState: CounterState = {
  products: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExistItem = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (isExistItem) {
        const getIndex = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (
          state.products[getIndex].quantity + (action.payload.quantity === 1 ? 1 : 0) <=
          state.products[getIndex].maxQuantity
        ) {
          state.products[getIndex].quantity = Number(action.payload.quantity)
        }
      } else {
        state.products.push(action.payload);
      }
    },
    deleteToCart: (state, action) => {
      const isExistItem = state.products.find(
        (product) => product.id === action.payload.id
      )
      if (isExistItem) {
        const indexOf = state.products.indexOf(action.payload.id);
        state.products.splice(indexOf, 1);
      }
    },
    removeAllCarts: (state) => {
        state.products = []
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart , deleteToCart, removeAllCarts} = counterSlice.actions;

export default counterSlice.reducer;

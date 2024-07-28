import { createSlice } from '@reduxjs/toolkit'

type TAddToCartProducts = {
  id : string,
  quantity : number,
  maxQuantity : number
}
export type CounterState = {
  products: TAddToCartProducts[]
}

const initialState: CounterState = {
  products: [] ,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart : (state, action) => {
        const isExistItem = state.products.find(product => product.id === action.payload.id)
        if(isExistItem){
          const getIndex = state.products.findIndex(product => product.id === action.payload.id)
          if(state.products[getIndex].quantity < state.products[getIndex].maxQuantity){
            state.products[getIndex].quantity = state.products[getIndex].quantity + 1
          }
        }
        else{
          state.products.push(action.payload)
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart } = counterSlice.actions

export default counterSlice.reducer
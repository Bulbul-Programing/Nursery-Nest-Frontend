import { createSlice } from '@reduxjs/toolkit'

export type CounterState = {
  id: string[]
}

const initialState: CounterState = {
  id: [] ,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart : (state, action) => {
        state.id.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart } = counterSlice.actions

export default counterSlice.reducer
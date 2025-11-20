import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    products :[],
    selectedItems : 0,
    totalPrice : 0
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart :(state,action) => {
            const isExist = state.products.find(product => product._id === action.payload._id)
            console.log(isExist)
        }
    }
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer
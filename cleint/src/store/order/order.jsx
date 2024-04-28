import {createSlice} from "@reduxjs/toolkit";


const  initialState = {
    orderId: null,
    error: null,
    loading: false,
}


const orderReducer =  createSlice({
    name :"order",
    initialState,
    reducers:{
        setOrderIdStart:(state) =>{
            state.loading=true;
        },
        setOrderIdSuccess:(state, action) =>{
            state.orderId = action.payload;
            state.loading = false;
            state.error = null
        },
        setOrderIdFailure : (state, action) =>{
         state.error = action.payload;
         state.loading = false
        } 
    }

})


export const { setOrderIdStart, setOrderIdSuccess, setOrderIdFailure } = orderReducer.actions;

export default orderReducer.reducer;
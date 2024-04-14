import { FetchState } from '@/enums/Fetch';
import { fetchCreateEmployee, fetchCreateOrder, fetchDetailEmployee, fetchEmployees, fetchUpdateEmployee } from '@/networks/employee';
import type { AppState } from '@/redux/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Employee, EmployeeParams, Book } from '@/types/book';
import type { APIResponse } from '@/types/response';

export interface CartState {
  status: FetchState;
  cart?: Book[];
}

const initialState: CartState = {
  status: FetchState.IDLE,
  cart: []
};

export const createOrder = createAsyncThunk('order/create', async (data: Book[], { rejectWithValue }) => {
  const token = localStorage.getItem('custom-auth-token');
  try {
    const response: Book[] = await fetchCreateOrder({ data, token });
    return response;
  } catch (error: any) {
    if (!error.response) throw error;
    return rejectWithValue(error.response);
  }
})

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const { id } = action.payload;
      const existingItemIndex: number = state.cart!.findIndex(item => item.id === id);
      
      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update its quantity
        state.cart![existingItemIndex].quantity! += 1;
      } else {
        // Item does not exist in the cart, add it with quantity 1
        state.cart!.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart!.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateCartItemQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.cart?.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity! += quantity; // Update the quantity of the existing item
        if (itemToUpdate.quantity! <= 0) {
        // If the quantity becomes zero or negative, remove the item from the cart
          state.cart = state.cart?.filter(item => item.id !== id);
        }
      }
    }      
  },
  extraReducers: (builder) => {
    builder
    .addCase(createOrder.pending, (state) => {
      state.status = FetchState.LOADING;
    })
    .addCase(createOrder.fulfilled, (state) => {
      state.status = FetchState.IDLE;
    })
    .addCase(createOrder.rejected, (state) => {
      state.status = FetchState.FAILED;
    })
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity } = CartSlice.actions;
export const selectCartItems = (state: AppState) => state.cart;
export default CartSlice.reducer;

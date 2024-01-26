import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: string;
}

export interface CartItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: string;
  quantity: number;
}

export interface ProductState {
  products: Product[];
  cart: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | SerializedError  | null;
}

const initialState: ProductState = {
  products: [],
  cart: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong while fetching the products.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

type ProductSliceActions = typeof addToCart.actions;

export const addToCart = createSlice({
  name: "products",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      if (newItem && newItem.id) {
        const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id);

        if (existingItemIndex !== -1) {
          state.cart[existingItemIndex].quantity++;
        } else {
          state.cart.push({ ...newItem, quantity: 1 });
        }
      } else {
        console.error("Invalid newItem payload:", newItem);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    updateQuantity(state, action: PayloadAction<{ itemId: number; change: number }>) {
      const { itemId, change } = action.payload;
      const itemToUpdate = state.cart.find(item => item.id === itemId);

      if (itemToUpdate) {
        itemToUpdate.quantity += change;
        if (itemToUpdate.quantity < 1) {
          state.cart = state.cart.filter(item => item.id !== itemId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string | SerializedError>) => {
          state.status = "failed";
          if (action.payload instanceof Error) {
            state.error = action.payload.message;
          } else {
            state.error = action.payload;
          }
        }
      );
  },
});

type ProductSliceReducer = typeof addToCart.reducer;

export type ProductSlice = ProductSliceActions & ProductSliceReducer;

export const productActions = { ...addToCart.actions, fetchProducts };

export default addToCart.reducer;

export type RootState = ReturnType<ProductSliceReducer>;
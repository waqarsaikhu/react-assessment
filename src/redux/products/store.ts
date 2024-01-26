import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productReducer from "./productSlice";

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the store with the product reducer
export const store = configureStore({
  reducer: {
    products: productReducer,
    // Add other reducers as needed
  },
});

// Define the type of thunk action
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

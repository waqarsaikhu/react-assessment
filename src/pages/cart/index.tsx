import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ProductState,
  CartItem,
  addToCart,
} from "../../redux/products/productSlice";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

interface RootState {
  products: ProductState;
}

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cart: CartItem[] = useSelector(
    (state: RootState) => state.products.cart
  );
  const { products }: any = useSelector((state: RootState) => state.products);
  const filteredProducts = selectedCategory
    ? products.filter((product: any) => product.category === selectedCategory)
    : products;
  const totalCost = cart.reduce((total, cartItem) => {
    return total + parseFloat(cartItem.price) * cartItem.quantity;
  }, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm("Confirm your purchase?");

    if (isConfirmed) {
      alert("Your purchase is successfull");
      router.push("/");
      dispatch(addToCart.actions.clearCart());
    } else {
      console.log("Checkout cancelled.");
    }
  };
  const handleQuantityChange = (itemId: number, change: number) => {
    dispatch(addToCart.actions.updateQuantity({ itemId, change }));
  };
  console.log("Length =>", totalCost);

  return (
    <>
      <Navbar onSelectCategory={setSelectedCategory} />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="flex flex-row">
          {/* Cart Items Div */}
          <div>
            {cart.length === 0 ? (
              <>
                <span className="text-gray-600">Your cart is empty.</span>
                <div className="mt-4">
                  <Link href="/">
                    <span className="text-blue-600 text-[12px] ml-[50px] hover:text-blue-800">
                      Go to Homepage
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col w-[680px]">
                <div className="flex flex-row justify-end text-[#8B8B8B]">
                  <span className="mr-[100px]">Name</span>
                  <span className="ml-[81px] text-end">Price</span>
                  <span className="ml-[81px]">Quantity</span>
                </div>
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="bg-white flex flex-row p-4 rounded-lg shadow-md w-[750px]"
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src={cartItem.image}
                        alt={cartItem.title}
                        className="w-24 h-24 mb-4"
                      />
                      <div className="flex flex-row ml-[116px]">
                        <div className="w-[177px]">
                          <span className="text-lg font-semibold mb-2">
                            {cartItem.title}
                          </span>
                        </div>
                        <span className="text-gray-800 font-bold ml-[108px]">
                          {cartItem.price}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(cartItem.id, -1)}
                          className="ml-[75px] rounded-[5px] bg-black text-white p-2 pb-3 h-[8px] mt-[3px] flex items-center"
                        >
                          -
                        </button>
                        <span className="text-black text-[15px] mb-1 mx-1 ">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(cartItem.id, 1)}
                          className="rounded-[5px] bg-black text-white p-2 pb-3 h-[8px] mt-[3px] flex items-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Checkout Div */}
          <div className="ml-[50px]">
            <div className=" ml-[50px]  p-4 rounded-lg shadow-lg w-[250px]">
              <h2 className="text-lg font-semibold mb-2">Your Total</h2>
              {cart.map((cartItem) => (
                <div className="flex flex-col">
                  <div className="flex justify-between mb-2">
                    <span className="text-black text-[12px] w-[100px]">
                      {cartItem.title} x{cartItem.quantity}
                    </span>
                    <span className="text-gray-800 font-bold">
                      ${parseFloat(cartItem.price) * cartItem.quantity}
                    </span>
                  </div>
                </div>
              ))}
              <div className=" mt-[20px]">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${totalCost.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-black  flex justify-center ml-[25px]  text-white py-2 px-14 rounded-lg mt-4"
                >
                  Check out
                </button>
                <div className="mt-4">
                  <Link href="/">
                    <span className="text-blue-600 text-[12px] ml-[70px] hover:text-blue-800">
                      Continue Shopping
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { ProductState } from "../redux/products/productSlice";
import Link from "next/link";
import { useRouter } from "next/router";

interface RootState {
  products: ProductState;
}

const Navbar = ({ onSelectCategory, onSearch }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useSelector((state: RootState) => state.products.cart);
  const router = useRouter();
  const totalItemsInCart = cart.reduce(
    (total: any, item: any) => total + item.quantity,
    0
  );
  const handleCategoryClick = (category: any) => {
    onSelectCategory(category);
    setSearchQuery("");
  };
  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="text-gray-800 pt-4 pl-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li onClick={() => handleCategoryClick(null)}>
            <span className="cursor-pointer">Ecommerce </span>
          </li>
          <li onClick={() => handleCategoryClick("electronics")}>
            <span className="hidden md:block lg:ml-[144px] cursor-pointer">
              Electronics
            </span>
          </li>
          <li onClick={() => handleCategoryClick("men's clothing")}>
            <span className="hidden md:block cursor-pointer">
              Men's Fashion
            </span>
          </li>
          <li onClick={() => handleCategoryClick("women's clothing")}>
            <span className="hidden md:block cursor-pointer">
              Women's Fashion
            </span>
          </li>
          <li onClick={() => handleCategoryClick("jewelery")}>
            <span className="hidden md:block cursor-pointer">Jewelry</span>
          </li>
          <li className="flex-grow">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative lg:ml-[70px]">
              <div className="absolute inset-y-0 right-1 flex items-center pl-3 pointer-events-none">
                <IoIosSearch />
              </div>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 md:w-64"
                placeholder="Search..."
              />
            </div>
          </li>
          <li className="flex">
            <Link href="/cart">
              <div className="rounded-[5px] lg:ml-[50px] lg:px-[20px] lg:py-[2px] px-[10px] py-[1px] flex items-center bg-black">
                <span className="flex text-white flex-row items-center">
                  {totalItemsInCart} <FaCartPlus className="ml-[5px]" />
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

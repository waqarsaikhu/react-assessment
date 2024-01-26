import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  fetchProducts,
  productActions,
} from "../../redux/products/productSlice";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaCartPlus } from "react-icons/fa";

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { products, status, error }: any = useSelector(
    (state: RootState) => state.products
  );

  const handleSearch = (query: any) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts() as any);
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const handleProductClick = (productId: any) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: any) => {
    dispatch(productActions.addItemToCart(product));
    console.log("Item added");
  };

  const searchedProducts = products.filter((product: any) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = searchQuery
    ? searchedProducts
    : selectedCategory
    ? products.filter((product: any) => product.category === selectedCategory)
    : products;

  return (
    <>
      <Navbar onSelectCategory={setSelectedCategory} onSearch={handleSearch} />
      <div className="flex justify-center my-[20px]">
        <span className=" font-bold text-[50px]">
          {searchQuery
            ? "Search Results"
            : selectedCategory // @ts-ignore
            ? selectedCategory.charAt(0).toUpperCase() +
              // @ts-ignore
              selectedCategory.slice(1)
            : "Products List"}
        </span>

        <Link href="/cart">
          <span className="ml-[70px] mt-[30px] text-sky-500 text-center flex justify-center items-center">
            Go to Cart
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-10">
        {filteredProducts.map((product: any) => (
          <div
            className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-4"
            key={product.id}
          >
            <div>
              <div className="flex justify-center">
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-32 rounded-lg cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  />
                </Link>
              </div>
              <div className="flex flex-col mt-4">
                <span className="text-[20px] font-bold">{product.title}</span>
                <span className="text-[14px] text-[#000]">
                  {product.category}
                </span>
                <span className="text-[17px] text-black">
                  {truncateDescription(product.description, 100)}
                  <span
                    onClick={() => handleProductClick(product.id)}
                    className="text-sky-400 text-[15px] cursor-pointer ml-1"
                  >
                    See More
                  </span>
                </span>
                <div className="text-lg font-medium text-gray-900 mt-2">
                  ${product.price}
                </div>
              </div>
            </div>
            <div>
              <button
                className="flex justify-center px-10 bg-black p-1 rounded-[10px] mt-4"
                onClick={() => handleAddToCart(product)} // Call handleAddToCart onClick
              >
                <span className="text-white flex flex-row items-center text-center">
                  Add to cart <FaCartPlus className="ml-[5px]" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;

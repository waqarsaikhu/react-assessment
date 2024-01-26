import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  RootState,
  fetchProducts,
  productActions,
} from "../../redux/products/productSlice";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const ProductDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const productId = router.query;

  const { products }: any = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const product = products.find(
    // @ts-ignore
    (product: any) => product.id === parseInt(productId.productId)
  );
  const handleAddToCart = (product: any) => {
    dispatch(productActions.addItemToCart(product));
    console.log("Item added");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar onSelectCategory={setSelectedCategory} />
      <Link href="/homepage">
        <div className="mt-10">
          <span className="text-[20px] text-[#000] px-10">Back</span>
        </div>
      </Link>
      <div className="px-10">
        <div
          className=" bg-white rounded-lg flex flex-row jurstify-center items-center
 p-4 relative"
        >
          <div className="">
            <img
              src={product.image}
              className=" w-full h-48  mb-4 rounded-t-lg"
            />
          </div>
          <div className="flex flex-col justify-between ml-[134px] w-[500px]">
            <span className="text-lg font-semibold text-gray-800 mb-4">
              {product.title}
            </span>
            <span className="text-[15px] text-[#888]">Category:</span>
            <span className="text-[15px] text-[#000] mb-4">
              {product.category}
            </span>
            <span className="text-[15px] text-[#888]">Description:</span>
            <span className="text-[15px] text-[#000] mb-4">
              {product.description}
            </span>
            <span className="text-[15px] text-[#888]">Price:</span>
            <span className="text-[26px] font-bold text-[#000] mb-4">
              ${product.price}
            </span>
            <button
              onClick={() => handleAddToCart(product)}
              className=" bg-black p-1 rounded-[10px]"
            >
              <span className="text-white">Buy now</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

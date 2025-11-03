import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt=""
          className="hover:scale-110 transition ease-in-out h-[250px] w-full object-cover"
        />
        <p className="pt-3 pb-1 md:text-sm text-[20px] max-sm:font-[600]">
          {name}
        </p>
        <p className="text-sm font-medium md:text-sm text-[20px] max-sm:font-[600]">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;

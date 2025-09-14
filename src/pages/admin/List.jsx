import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { ShopContext } from "../../context/ShopContext";

const List = () => {
  const { token } = useOutletContext();
  const [list, setList] = useState([]);
  const { currency } = useContext(ShopContext);
  const fetchList = async () => {
    try {
      const response = await axiosInstance.get("/product/list");
      // console.log(response.data);
      if (response.status === 200) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axiosInstance.delete(`/product/${id}`, {
        headers: { token },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        await fetchList();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ---- List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---- Product List ------ */}
        {list.map((item, index) => {
          return (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 gap-2 text-sm"
              key={index}
            >
              <img className="w-12" src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg cursor-pointer"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;

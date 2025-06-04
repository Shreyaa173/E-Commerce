import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { use } from "react";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "api/product/remove",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Product deleted successfully");
        await fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All products List</p>
      <div>
        <div className="grid grid-cols-5 gap-4 bg-gray-200 p-2 text-center font-bold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 p-2 border-b text-center"
          >
            <div className="flex items-center justify-center">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
            </div>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <div className="flex items-center justify-center">
              <p
                className="h-10 bg-red-500 text-white p-[5px]  rounded cursor-pointer"
                onClick={() => deleteProduct(item._id)}
              >
                Delete
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;

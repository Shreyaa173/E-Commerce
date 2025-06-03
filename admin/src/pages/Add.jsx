import React, { useState } from "react";
import upload_area from "../assets/admin_assets/upload_area.png";
import axios from "axios";
import { backendUrl } from "../App";

const sizes = ["S", "M", "L", "XL", "XXL"];

const Add = ({ token }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men"); // Set default value
  const [subCategory, setSubCategory] = useState("Topwear"); // Set default value
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(selectedSizes));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      
      // Reset form after successful submission
      if (response.data.success) {
        setName("");
        setDescription("");
        setPrice("");
        setSelectedSizes([]);
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        alert("Product added successfully!");
      }
    } catch (e) {
      console.error("Error uploading images:", e.response?.data || e.message);
      alert("Failed to upload images. Please try again.");
    }
  };

  return (
    <form
      className="p-6 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <p className="text-lg font-medium mb-2">Upload Image</p>
        <div className="w-1/2 grid grid-cols-4 gap-2">
          <label htmlFor="image1">
            <img src={!image1 ? upload_area : URL.createObjectURL(image1)} className="w-20" alt="upload" />
            <input
              type="file"
              id="image1"
              className="hidden"
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? upload_area : URL.createObjectURL(image2)}
              className="w-20"
              alt="upload"
            />
            <input
              type="file"
              id="image2"
              className="hidden"
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? upload_area : URL.createObjectURL(image3)}
              className="w-20"
              alt="upload"
            />
            <input
              type="file"
              id="image3"
              className="hidden"
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? upload_area : URL.createObjectURL(image4)}
              className="w-20"
              alt="upload"
            />
            <input
              type="file"
              id="image4"
              className="hidden"
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Product name</label>
        <input
          type="text"
          placeholder="Type here"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Product description
        </label>
        <textarea
          rows="3"
          placeholder="Write content here"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Product category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sub category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Price
          </label>
          <input
            type="number"
            placeholder="25"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium mb-1">Product Sizes</p>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              type="button"
              key={size}
              className={`px-3 py-1 rounded-md border ${
                selectedSizes.includes(size)
                  ? "bg-pink-300"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => toggleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => setBestseller((prev) => !prev)}
            checked={bestseller}
          />
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
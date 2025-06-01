import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, removeFromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const shippingCost = 4.99; // Example shipping cost

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          const product = products.find((p) => p._id === productId);
          const cartItem = {
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
            name: product?.name,
            price: product?.price,
            image: product?.images?.[0] || product?.image,
            sizeSpecificImage: product?.sizeImages?.[size] || null,
          };
          tempData.push(cartItem);
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  const getImageSource = (item) => {
    if (item.sizeSpecificImage) return item.sizeSpecificImage
    if (item.image) return item.image;
    return "/api/placeholder/96/96";
  };

  const handleDelete = (productId, size) => {
    removeFromCart(productId, size);
  };

  const subtotal = cartData.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8 text-[3xl]">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {cartData.map((item, index) => (
              <div
                key={`${item._id}-${item.size}-${index}`}
                className="border p-4 rounded-lg flex items-center gap-4 relative bg-white shadow-sm"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={getImageSource(item)}
                    alt={item.name || "Product image"}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="font-medium text-lg">{item.name || "Product"}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  {item.price && (
                    <p className="font-semibold text-gray-900">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(item._id, item.size)}
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="border rounded-lg p-6 bg-white shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{currency}{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{currency}{shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link to = "/placeorder"> <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors mt-6">
                  Proceed to Checkout
                </button></Link>

                <p className="text-sm text-gray-500 mt-4">
                  Shipping charges are calculated based on your location. 
                  Free shipping on orders over {currency}50.00
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const PlaceOrder = () => {
  const { products, currency, cartItems } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const shippingCost = 4.99;

  // Fetch order data from cart
  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          const product = products.find((p) => p._id === productId);
          const orderItem = {
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
            name: product?.name,
            price: product?.price,
          };
          tempData.push(orderItem);
        }
      }
    }
    setOrderData(tempData);
  }, [cartItems, products]);

  const subtotal = orderData.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    // Add order placement logic here
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <Title text1={"PLACE"} text2={"ORDER"} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Order Details */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {orderData.map((item, index) => (
                <div
                  key={`${item._id}-${item.size}-${index}`}
                  className="flex justify-between items-center py-3 border-b last:border-0"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {currency}
                    {((item.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium text-black">John Doe</p>
              <p>123 Fashion Street</p>
              <p>Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Summary */}
        <div>
          <div className="border rounded-lg p-6 bg-white shadow-sm sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>
            
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

              <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
                <p className="mb-2">Payment Method: Credit Card</p>
                <p>Card ending in •••• 4242</p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors mt-6"
              >
                Place Order
              </button>

              <p className="text-sm text-gray-500 mt-4">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
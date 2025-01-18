import React, { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  
  // Mock order data using products from context
  // In a real app, this would come from an API or database
  const orders = [
    {
      id: "ORD-123456",
      date: "2024-01-15",
      status: "Delivered",
      items: products.slice(0, 2).map(product => ({
        name: product.name,
        size: "M", // This could be dynamic based on user selection
        quantity: 1,
        price: product.price,
        image: product.image || "/api/placeholder/96/96"
      })),
      total: products.slice(0, 2).reduce((sum, product) => sum + product.price, 0)
    }
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {(!products.length || orders.length === 0) ? (
        <div className="text-center text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4" />
          <p>You haven't placed any orders yet</p>
          <Link
            to="/shop"
            className="inline-block mt-4 text-black hover:underline"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-4 border-t"
                  >
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="font-semibold">
                        {currency} {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{currency} {order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                  Track Order
                </button>
                <button className="flex-1 border border-black py-2 rounded-md hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
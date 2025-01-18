import React from "react";
import Title from "../components/Title";
import { Truck } from "lucide-react";

const DeliveryPolicy = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <Title text1={"DELIVERY"} text2={"POLICY"} />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Information
              </h2>
              <div className="space-y-3 text-gray-600">
                <p>Standard delivery time: 3-5 business days</p>
                <p>Express delivery time: 1-2 business days</p>
                <p>International shipping: 7-14 business days</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Shipping Costs</h2>
              <div className="space-y-3 text-gray-600">
                <p>Free shipping on orders over $50</p>
                <p>Standard shipping: $5.99</p>
                <p>Express shipping: $12.99</p>
                <p>International shipping: Calculated at checkout</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Delivery Areas</h2>
              <div className="space-y-3 text-gray-600">
                <p>We deliver to all 50 states in the United States</p>
                <p>International shipping available to select countries</p>
                <p>Some remote areas may require additional delivery time</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPolicy
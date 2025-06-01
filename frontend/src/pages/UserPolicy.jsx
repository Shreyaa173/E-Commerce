import React from "react";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const UserPolicy = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <Title text1={"PRIVACY"} text2={"POLICY"} />
      </div>

      <div className="bg-white border rounded-lg p-6 shadow-sm space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <div className="space-y-3 text-gray-600">
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through our payment processors)</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <div className="space-y-3 text-gray-600">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process your orders and payments</li>
              <li>Communicate with you about your orders and our services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Protect against fraud and unauthorized transactions</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-gray-600">
            We do not sell or rent your personal information to third parties. We may share your
            information with service providers who assist in our operations, such as payment
            processors and shipping companies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to protect your
            personal information against unauthorized access, alteration, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, correct, or delete your personal information.
            Contact us at <a href="mailto:privacy@yourstore.com" className="text-blue-600 hover:underline">privacy@yourstore.com</a> for any privacy-related concerns.
          </p>
        </section>
      </div>
    </div>
  );
};

export default UserPolicy;

// import React from 'react'

// const UserPolicy = () => {
//   return (
//     <div>PrivacyPolicy</div>
//   )
// }

// export default UserPolicy

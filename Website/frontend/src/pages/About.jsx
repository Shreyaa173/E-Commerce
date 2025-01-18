import React from "react";
import Title from "../components/Title";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import logo from "../assets/assets/frontend_assets/logo.png"

// About Page Component
const About = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2020, our journey began with a simple mission: to provide
              high-quality, sustainable fashion that empowers individuals to express
              their unique style. What started as a small collection has grown into
              a comprehensive range of contemporary clothing and accessories.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We believe in creating fashion that not only looks good but feels
              good too. Our commitment to sustainability drives every decision we
              make, from sourcing materials to packaging. We're dedicated to
              reducing our environmental impact while delivering exceptional style
              and quality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Sustainable and ethical manufacturing</li>
              <li>• Quality craftsmanship</li>
              <li>• Inclusive sizing and designs</li>
              <li>• Fair pricing and transparency</li>
              <li>• Customer-first approach</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <img
            src={logo}
            alt="About Us"
            className="w-full object-cover rounded-lg mb-6"
          />
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
            <p className="text-gray-600 leading-relaxed">
              We stand behind every piece we create. Our quality guarantee ensures
              that you'll love not just how our clothes look, but how they feel
              and last. We're committed to providing exceptional customer service
              and creating a shopping experience that exceeds your expectations.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Quick Facts</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 100% Sustainable Materials</li>
              <li>• Ethically Manufactured</li>
              <li>• Ships to 50+ Countries</li>
              <li>• 30-Day Returns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

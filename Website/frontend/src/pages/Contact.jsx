import React from 'react'
import Title from "../components/Title";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add contact form submission logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    123 Fashion Street,
                    <br />
                    Design District, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@yourstore.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">FAQ</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Shipping & Delivery</h4>
                <p className="text-gray-600 text-sm">
                  For questions about shipping and delivery times, please check our
                  shipping policy page.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Returns & Exchanges</h4>
                <p className="text-gray-600 text-sm">
                  We offer free returns within 30 days of purchase. Visit our
                  returns page for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact
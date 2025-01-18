import React from "react";
import { assets } from "../assets/assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className=" mb-5 w-32" alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            dolores eveniet accusantium ea totam dolore magni corporis placeat
            commodi. Odit, delectus quaerat! Eligendi laborum fugit dolor
            voluptatibus eos sunt Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Optio, qui!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/delivery-policy" className="hover:underline">
                Delivery Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>9876543210</li>
            <li>xyz@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-sm py-5 text-center">
          Copyright 2024@ forever.com - All rights reserved!!
        </p>
      </div>
    </div>
  );
};

export default Footer;

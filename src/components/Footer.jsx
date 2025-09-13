import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div className="mt-[-60px]">
          <img src={assets.logo1} alt="" className="w-50 h-auto" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            tenetur facilis accusamus ad iure quo illo velit, corporis
            perspiciatis atque?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                About
              </Link>
            </li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ fiftan.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

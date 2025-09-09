import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="border-t border-gray-200 pt-14">
      <div className="text-2xl mb-3 text-center">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
        <img
          src={assets.about_img}
          alt=""
          className="max-w-[500px] w-full h-auto"
        />
        <div className="text-[#6D6D6D] md:text-[18px] font-[400] text-[16px] flex flex-col items-center md:items-start gap-5 max-w-[550px] w-full">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h5 className="font-[700] capitalize">Our Mission </h5>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

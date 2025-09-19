import React from "react";
import { useNavigate } from "react-router-dom";
import error from "../assets/frontend_assets/rafiki.png";

const Error404 = () => {
  const redirect = useNavigate();
  return (
    <div className="flex items-center justify-center mt-20 mx-auto max-w-[600px] w-full">
      <div>
        <button
          onClick={() => redirect("/")}
          className="bg-black text-white w-[150px] h-[60px] rounded-md mb-4 "
        >
          Return to Home
        </button>
        <img src={error} alt="" />
      </div>
    </div>
  );
};

export default Error404;

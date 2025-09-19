import React from "react";
import jerseyImg from "../assets/frontend_assets/jerseys.jpg";

const JerseyCard = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="clip-trapezoid bg-teal-800 text-white flex items-center p-4 rounded-2xl">
        <div className="w-40 h-28 overflow-hidden rounded-lg flex-shrink-0">
          <img
            src={jerseyImg}
            alt="Fitfan Jerseys"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 ml-4">
          <h2 className="text-lg lg:text-4xl font-semibold leading-snug">
            Elegance Design <br />
            Fitfan <span className="text-yellow-400">Jerseys</span>
          </h2>

          <span className="inline-block w-15 lg:w-30 absolute right-2 lg:right-20 -rotate-40 bg-white text-teal-800 text-sm font-bold px-3 py-1 mt-2 rounded-full shadow">
            $20.00
          </span>

          <button className="mt-3 w-[150px] bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-full flex items-center gap-2 transition">
            Shop More
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JerseyCard;

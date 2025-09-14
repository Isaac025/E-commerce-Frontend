import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-16 md:w-64 min-h-screen bg-white border-r border-gray-400 shadow-sm flex flex-col">
      <div className="flex flex-col gap-2 pt-6 px-2 md:px-4 text-[15px]">
        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 md:gap-3 px-2 md:px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#ffebf5] text-blue-600 font-medium border border-[#c586a5]"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <img className="w-6 h-6" src={assets.add_icon} alt="Add" />
          {/* Hide text on small screens */}
          <p className="hidden md:block">Add items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/admin/list"
          className={({ isActive }) =>
            `flex items-center gap-3 md:gap-3 px-2 md:px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#ffebf5] text-blue-600 font-medium border border-[#c586a5]"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="List" />
          <p className="hidden md:block">List items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 md:gap-3 px-2 md:px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-[#ffebf5] text-blue-600 font-medium border border-[#c586a5]"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <img className="w-6 h-6" src={assets.order_icon} alt="Orders" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

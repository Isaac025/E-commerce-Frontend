import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../admin/Navbar";
import Sidebar from "../admin/Sidebar";
import AdminLogin from "../admin/AdminLogin";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminLayout = () => {
  const [token, setToken] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {token === "" ? (
        <AdminLogin />
      ) : (
        <>
          <Navbar />
          <hr />

          <div className="flex">
            <aside className="w-full  bg-white border-r shadow-sm">
              <Sidebar />
            </aside>

            <main className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Outlet />
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLayout;

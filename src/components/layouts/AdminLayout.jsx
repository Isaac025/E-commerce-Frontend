import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../admin/Navbar";
import Sidebar from "../admin/Sidebar";
import AdminLogin from "../admin/AdminLogin";

const AdminLayout = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {token === "" ? (
        <AdminLogin setToken={setToken} token={token} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />

          <div className="flex">
            <aside className="  bg-white border-r border-gray-100 shadow-sm">
              <Sidebar />
            </aside>

            <main className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Outlet context={{ token, setToken }} />
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLayout;

import React from "react";
import Nav from "../Nav";
import Footer from "../Footer";
import SearchBar from "../SearchBar";
import { Outlet } from "react-router-dom";
import BackToTop from "../BackToTop";
import WhatsappButton from "../WhatsappButton";

const MainLayout = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Nav />
      <SearchBar />
      <Outlet />
      <BackToTop />
      <WhatsappButton />
      <Footer />
    </div>
  );
};

export default MainLayout;

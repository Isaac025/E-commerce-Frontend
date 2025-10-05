import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  // Your WhatsApp number (with country code, no + or spaces, e.g. 234XXXXXXXXXX for Nigeria)
  const phoneNumber = "2349057449212";
  const message =
    "Hi, can you share more details about your products and delivery?";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-18 right-6 p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
    >
      <FaWhatsapp size={25} />
    </a>
  );
};

export default WhatsappButton;

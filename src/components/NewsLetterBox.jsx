import React, { useState } from "react";

const NewsLetterBox = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData(form);
    const response = await fetch("https://formspree.io/f/mldprwkl", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("Thanks for your message! We'll be in touch.");
      form.reset();
    } else {
      setStatus("Oops! There was a problem submitting your form.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
          Subscribe now & get 20% off
        </h2>
        <p className="mb-4 text-center text-gray-800">
          Sign up today & grab 20% off on stylish jersey wears. Don’t wait, look
          fresh on and off the field!
        </p>
        <div className="flex items-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className=" p-2 block w-[60%] border rounded-tl-md rounded-bl-md"
          />

          <button
            type="submit"
            className=" w-[40%] cursor-pointer bg-black text-white p-2 rounded-tr-md rounded-br-md hover:bg-black/80 transition"
          >
            Send
          </button>
        </div>

        {status && <p className="mt-4 text-sm text-green-600">{status}</p>}
      </form>
    </div>
  );
};

export default NewsLetterBox;

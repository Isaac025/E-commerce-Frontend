import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [rates, setRates] = useState({ bitcoin: { usd: 0 } });

  const {
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const redirect = useNavigate();

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const data = await res.json();
        setRates(data);
      } catch (error) {
        console.error("Error fetching BTC rates:", error);
      }
    };
    fetchRates();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        case "crypto": {
          setShowCryptoModal(true);
          break;
        }

        case "whatsapp": {
          const ownerNumber = "2349057449212"; // 🔴 change to owner’s number
          const message = `
📦 *New Order Request*  

👤 Name: ${formData.firstName} ${formData.lastName}  
📧 Email: ${formData.email}  
📱 Phone: ${formData.phone}  
🏠 Address: ${formData.street}, ${formData.city}, ${formData.state}, ${
            formData.zipcode
          }, ${formData.country}  

🛒 *Items:*  
${orderItems
  .map(
    (item) =>
      `- ${item.name} (${item.size}) x ${item.quantity} = $${
        item.price * item.quantity
      }`
  )
  .join("\n")}

💰 *Total:* $${orderData.amount}
        `;

          const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(
            message
          )}`;
          window.open(whatsappUrl, "_blank");
          break;
        }

        case "paytobank": {
          setShowBankModal(true);
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleBankConfirm = async () => {
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const response = await axiosInstance.post(
        "/order/place",
        {
          address: formData,
          items: orderItems, // ✅ now saving items
          amount: getCartAmount() + delivery_fee,
          paymentMethod: "paytobank", // ✅ will now save Bank Transfer method
        },
        { headers: { token } }
      );

      if (response.status === 200) {
        setCartItems({});
        setShowBankModal(false);
        redirect("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Bank order failed.");
    }
  };

  const totalUSD = getCartAmount() + delivery_fee;
  const btcRate = rates.bitcoin?.usd || 1;
  const totalBTC = totalUSD / btcRate;

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        {/* ------------- Left Side ---------- */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
          />
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
          />
        </div>

        {/* ----------- Right Side -------- */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>
          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("paytobank")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "paytobank" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  PAY TO BANK
                </p>
              </div>

              <div
                onClick={() => setMethod("crypto")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "crypto" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  PAY WITH CRYPTO
                </p>
              </div>

              <div
                onClick={() => setMethod("whatsapp")}
                className="flex items-center border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "whatsapp" ? "bg-green-400" : ""
                  }`}
                ></p>
                <FaWhatsapp className="text-green-500 text-2xl mx-4" />
                <p className="text-gray-500 text-sm font-medium">WhatsApp</p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black cursor-pointer text-white px-16 py-3 text-sm"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* 🔹 Bank Modal */}
      {showBankModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Bank Transfer Details
            </h2>
            <p>
              <strong className="uppercase">Bank Name:</strong> Providus Bank
            </p>
            <p>
              <strong>Account Name:</strong> GS PREMIER GLOBAL
            </p>
            <p>
              <strong>Account Number:</strong> 1307148965
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please transfer the order amount to the above account. After
              payment, your order will be processed.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowBankModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleBankConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                I Have Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Crypto Modal */}
      {/* 🔹 Crypto Modal */}
      {showCryptoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Pay with Bitcoin</h2>

            {/* ✅ QR Code with BTC + Amount */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:bc1qc4kjtfsmmt6j8kk85sq0fflz0u5mggjrq3gq8f?amount=${totalBTC.toFixed(
                6
              )}`}
              alt="Crypto QR"
              className="mx-auto mb-4"
            />

            <p className="text-sm break-all">
              <strong>BTC Address:</strong>{" "}
              bc1qc4kjtfsmmt6j8kk85sq0fflz0u5mggjrq3gq8f
            </p>
            <p className="text-sm">
              <strong>Amount (USD):</strong> ${totalUSD.toFixed(2)}
            </p>
            <p className="text-sm">
              <strong>Amount (BTC):</strong> {totalBTC.toFixed(6)} BTC
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Send the exact BTC amount to the wallet. After payment, click "I
              Have Paid".
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowCryptoModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    let orderItems = [];
                    for (const items in cartItems) {
                      for (const item in cartItems[items]) {
                        if (cartItems[items][item] > 0) {
                          const itemInfo = structuredClone(
                            products.find((p) => p._id === items)
                          );
                          if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                          }
                        }
                      }
                    }

                    const response = await axiosInstance.post(
                      "/order/place",
                      {
                        address: formData,
                        items: orderItems,
                        amount: totalUSD,
                        paymentMethod: "crypto",
                      },
                      { headers: { token } }
                    );

                    if (response.status === 200) {
                      setCartItems({});
                      setShowCryptoModal(false);
                      redirect("/orders");
                    }
                  } catch (error) {
                    toast.error("Crypto order failed.");
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                I Have Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;

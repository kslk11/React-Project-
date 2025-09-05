import React, { useState } from "react";

const Payment = () => {
  const [paymentMode, setPaymentMode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMode) {
      alert("⚠️ Please select a payment method");
      return;
    }
    alert(`✅ Payment mode selected: ${paymentMode}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Payment Method</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value="Credit Card"
                checked={paymentMode === "Credit Card"}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              <span>💳 Credit Card</span>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value="Debit Card"
                checked={paymentMode === "Debit Card"}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              <span>🏦 Debit Card</span>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMode === "UPI"}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              <span>📱 UPI</span>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMode === "Cash on Delivery"}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              <span>💵 Cash on Delivery</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition duration-300 shadow-md"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

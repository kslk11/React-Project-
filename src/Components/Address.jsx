import React from "react";
import { useSelector } from "react-redux";

const Address = () => {
  const address = useSelector((state) => state.address.address);

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Saved Address</h2>

        {address && (address.house || address.area || address.city || address.state) ? (
          <div className="space-y-2">
            <p className="text-base font-medium text-gray-900">
              House No: {address.house}, {address.area}
            </p>
            <p className="text-gray-700">
              {address.city}, {address.state}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No address saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Address;

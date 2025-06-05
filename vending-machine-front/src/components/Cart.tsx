import React from "react";
import type { Product } from "../services/api";

interface CartProps {
  selectedProducts: Product[];
  balance: number;
  onComplete: () => void;
  onCancel: () => void;
}

export const Cart: React.FC<CartProps> = ({
  selectedProducts,
  balance,
  onComplete,
  onCancel,
}) => {
  const total = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>
      <div className="mb-4">
        <p className="text-lg">Balance: {balance?.toFixed(2) || "0.00"} MAD</p>
        {selectedProducts.length > 0 && (
          <p className="text-lg">Total: {total.toFixed(2)} MAD</p>
        )}
      </div>
      {selectedProducts.length > 0 ? (
        <div className="space-y-2">
          {selectedProducts.map((product, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{product.name}</span>
              <span>{product.price} MAD</span>
            </div>
          ))}
          <div className="flex space-x-2 mt-4">
            <button
              onClick={onComplete}
              className="bg-secondary hover:bg-secondary/80 text-white font-bold py-2 px-4 rounded"
            >
              Complete Purchase
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No products selected</p>
      )}
    </div>
  );
};

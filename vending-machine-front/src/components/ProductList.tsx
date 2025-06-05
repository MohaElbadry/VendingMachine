import React from "react";
import type { Product } from "../services/api";

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  balance: number;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onSelectProduct,
  balance,
}) => {
  console.log("ProductList rendering with products:", products);
  console.log("ProductList balance:", balance);

  if (!Array.isArray(products)) {
    console.log("Products is not an array:", products);
    return <p className="text-gray-500">No products available</p>;
  }

  console.log("Number of products to render:", products.length);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Available Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col items-center"
          >
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price} MAD</p>
            <button
              onClick={() => onSelectProduct(product)}
              disabled={!product.purchasable || product.price > balance}
              className={`mt-2 px-4 py-2 rounded-md ${
                product.purchasable && product.price <= balance
                  ? "bg-secondary hover:bg-secondary/80 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

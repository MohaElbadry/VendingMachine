import { useEffect, useState } from "react";
import { api } from "./services/api";
import type { Product, VendingMachineState } from "./services/api";
import { CoinInserter } from "./components/CoinInserter";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import "./App.css";

function App() {
  const [state, setState] = useState<VendingMachineState>({
    balance: 0,
    products: [],
    selectedProducts: [],
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      console.log("Starting loadProducts...");
      const response = await api.getProducts();
      console.log("API Response in loadProducts:", response);

      // Check the structure of the response
      const products = response.data ? response.data : response;
      console.log("Extracted products array:", products);

      setState((prev) => {
        console.log("Previous state:", prev);
        const newState = { ...prev, products };
        console.log("New state:", newState);
        return newState;
      });
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const handleInsertCoin = async (value: number) => {
    try {
      const response = await api.insertCoin(value);
      console.log("Insert coin response:", response);

      if (response.success) {
        setState((prev) => ({
          ...prev,
          balance: response.currentBalance,
          // Use the response.data if available, otherwise keep existing products
          products:
            response.data?.map((p: Product) => ({
              ...p,
              purchasable: p.price <= response.currentBalance,
            })) ||
            prev.products.map((p) => ({
              ...p,
              purchasable: p.price <= response.currentBalance,
            })),
        }));
      }
    } catch (error) {
      console.error("Failed to insert coin:", error);
    }
  };

  const handleSelectProduct = async (product: Product) => {
    try {
      console.log("Selecting product:", product);
      const response = await api.selectProduct(product.id);
      console.log("Select product response:", response);

      if (response.success) {
        setState((prev) => ({
          ...prev,
          balance: response.currentBalance,
          selectedProducts: [...prev.selectedProducts, product],
          // Update products with new purchasable state
          products:
            response.data?.map((p: Product) => ({
              ...p,
              purchasable: p.price <= response.currentBalance,
            })) ||
            prev.products.map((p) => ({
              ...p,
              purchasable: p.price <= response.currentBalance,
            })),
        }));
      }
    } catch (error) {
      console.error("Failed to select product:", error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await api.completeTransaction();
      console.log("Complete transaction response:", response);

      if (response.success) {
        // Format the change breakdown
        const changeBreakdown = response.change
          .map((coin: number) =>
            coin > 0 ? `${coin} MAD: ${coin} coin(s)` : null
          )
          .filter(Boolean)
          .join("\n");

        // Format dispensed products
        const dispensedProducts = response.dispensedProducts
          .map((p: Product) => p.name)
          .join(", ");

        // Show transaction summary
        alert(`Transaction completed successfully!\n
Products dispensed: ${dispensedProducts}\n
Your change: ${response.changeTotal} MAD\n
Change breakdown:\n${changeBreakdown}`);

        setState({
          balance: 0, // Reset balance after transaction
          products: response.data || [],
          selectedProducts: [],
        });
      }
    } catch (error) {
      console.error("Failed to complete transaction:", error);
      alert("Failed to complete transaction. Please try again.");
    }
  };

  const handleCancel = async () => {
    try {
      const response = await api.cancelTransaction();
      console.log("Cancel transaction response:", response);

      if (response.success) {
        alert(
          `Transaction cancelled.\nYour balance: ${response.currentBalance} MAD`
        );
        setState({
          balance: response.currentBalance,
          products: response.data || [],
          selectedProducts: [],
        });
      }
    } catch (error) {
      console.error("Failed to cancel transaction:", error);
      alert("Failed to cancel transaction. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Vending Machine</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CoinInserter onInsertCoin={handleInsertCoin} />
            <Cart
              selectedProducts={state.selectedProducts}
              balance={state.balance}
              onComplete={handleComplete}
              onCancel={handleCancel}
            />
          </div>
          <ProductList
            products={state.products}
            onSelectProduct={handleSelectProduct}
            balance={state.balance}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

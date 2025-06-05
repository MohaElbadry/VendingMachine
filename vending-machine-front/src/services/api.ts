import axios from "axios";

const API_URL = "http://localhost:3000/api";

export interface Product {
  id: string;
  name: string;
  price: number;
  purchasable: boolean;
}

export interface VendingMachineState {
  balance: number;
  products: Product[];
  selectedProducts: Product[];
}

export const api = {
  async insertCoin(value: number) {
    const response = await axios.post(`${API_URL}/coins`, { value });
    console.log("insertCoin response:", response.data);
    return response.data;
  },

  async getProducts() {
    const response = await axios.get(`${API_URL}/products`);
    console.log("Raw API response:", response);
    console.log("API response data:", response.data);
    return response.data;
  },

  async selectProduct(productId: string) {
    const response = await axios.post(
      `${API_URL}/products/${productId}/select`
    );
    console.log("selectProduct response:", response.data);
    return response.data;
  },

  async completeTransaction() {
    const response = await axios.post(`${API_URL}/transaction/complete`);
    console.log("completeTransaction response:", response.data);
    return response.data;
  },

  async cancelTransaction() {
    const response = await axios.post(`${API_URL}/transaction/cancel`);
    console.log("cancelTransaction response:", response.data);
    return response.data;
  },
};

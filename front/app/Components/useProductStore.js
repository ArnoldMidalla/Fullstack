//instead of fetching data directly in the home component, fetch here cos 'it'll be better'

import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

const BackendApiUrl = process.env.BaseUrl || "http://localhost:4000";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: true,
  error: null,
  selectedProduct: null,

  // form to add product
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${BackendApiUrl}/api/products`);
      //first data is from axios and the second is from the saving to data we did when creating our api
      toast.success(" Products fetched successfully");
      set({ products: res.data.data, loading: false });
    } catch (error) {
      set({
        error: `Couldn't fetch. Maybe na network: ${error.message}`,
        loading: false,
      });
      toast.error(error);
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BackendApiUrl}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
        loading: false,
      }));
      toast.success(" Product deleted successfully");
    } catch (error) {
      set({
        error: ` Something is wrong obvs ${error.message}`,
        loading: false,
      });
      toast.error(error);
    }
  },

  addProduct: async () => {
    // e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BackendApiUrl}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      set({ loading: false });
    } catch (error) {
      // console.log(error);
      set({
        loading: false,
        error: `Can't add product. Check your network boss: ${error.message}`,
      });
      toast.error(error);
    }
  },

  // for specific product page:
  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${BackendApiUrl}/api/products/${id}`);
      set({
        selectedProduct: res.data.data,
        formData: res.data.data, //prefill form with existing data
        loading: false,
      });
      toast.success(`Fetched specific product successfully`);
    } catch (error) {
      set({
        loading: false,
        error: `Couldn't get specific product. Maybe na network: ${error.message}`,
      });
      toast.error(error);
    }
  },

  editProductById: async (id) => {
    set({ loading: true });
    try {
      const {formData} = get();
      const res = await axios.put(`${BackendApiUrl}/api/products/${id}`, formData);
      
      set({ loading: false , selectedProduct: res.data.data});
      toast.success(`Successfully edited specific product`);
    } catch (error) {
      set({
        loading: false,
        error: `Couldn't edit specific product. Maybe na network: ${error.message}`,
      });
      toast.error(error);
    }
  },
}));

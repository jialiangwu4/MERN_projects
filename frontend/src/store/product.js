import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  // define the function setProduct that updates the products array
  // in the cuurent state by merging the new products array with the existing
  // state using the set function from the Zustand library.
  setProduct: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      // check if all fields are filled
      return { success: false, message: "Please fill in all fields" };
    }

    // The fetch function is a built-in JavaScript function that provides a way
    // to make network requests.
    const response = await fetch("/api/products", {
      // send a POST request to the /api/products endpoint (prefix is set in vite.config.js)
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct), // convert the newProduct object to JSON
    });

    const data = await response.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    // update the state of the store after a new product is saved to the database
    // it takes the current state of the store (state) and returns a new state object
    // the new state object has a products key which is an array that contains all the products
    // in the current state plus the new product that was just created (data.data)
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Prodcut created successfully" };
  },

  fetchProducts: async () => {
    const response = await fetch("/api/products");

    const data = await response.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set({ products: data.data });
    return { success: true, message: "Products fetched successfully" };
  },

  deleteProduct: async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // update the state of the store after a product is deleted
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));

    return { success: true, message: "Product deleted successfully" };
  },
}));

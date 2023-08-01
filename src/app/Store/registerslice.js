import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "signup",
  initialState: {
    currentUser: [],
    isLoggedIn: false,
    cart: [],
    subitem: 0,
    username: null, // Add username to the initial state
    uid: null, // Add uid to the initial state
    cartLength: 0,
  },

  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      console.log("signin", state.currentUser);
      state.isLoggedIn = true;
      state.username = action.payload;
      state.uid = action.payload.id;
    },

    register: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.username = action.payload;
      state.uid = action.payload.id;
    },
    logout: (state) => {
      state.currentUser = [];
      state.isLoggedIn = false;
      state.username = null;
      state.uid = null;
    },

    addCart: (state, action) => {
      const { product, userid } = action.payload;

      const userCart = state.cart.filter((cartItem) => cartItem.id === userid);

      if (userCart.length > 0) {
        const existingProduct = userCart.find((item) => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += 1;
          alert("Already have in cart");
        } else {
          state.cart.push({ userid, ...product, quantity: 1 });
        }
      } else {
        state.cart.push({ userid, ...product, quantity: 1 });
      }
    },
    removecart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productIdToRemove);
    },
    increment: (state, action) => {
      console.log("state3", state);
      const productId = action.payload;
      const existingProduct = state.cart.find((item) => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },

    decrement(state, action) {
      const productId = action.payload;
      const existingProduct = state.cart.find((item) => item.id === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        }
      }
    },
    updateCartLength: (state, action) => {
      state.cartLength = action.payload; // Update the cart length in the state with the new value
    },
  },
});

export const {
  login,
  logout,
  register,
  addCart,
  decrement,
  increment,
  removecart,
  updateCartLength,
} = registerSlice.actions;

export default registerSlice.reducer;

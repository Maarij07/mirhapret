import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Initial state of the cart
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
};

// Define action types to avoid magic strings
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

// Helper function to calculate cart totals
const calculateCartTotals = (cartItems) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return {
    cartItems,
    totalAmount,
    totalItems,
  };
};

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCartAdd = [...state.cartItems, action.payload];
      return calculateCartTotals(updatedCartAdd);

    case REMOVE_FROM_CART:
      const updatedCartRemove = state.cartItems.filter(item => item.id !== action.payload);
      return calculateCartTotals(updatedCartRemove);

    case CLEAR_CART:
      return {
        ...initialState,
      };

    case UPDATE_CART_ITEM:
      const updatedCartUpdate = state.cartItems.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return calculateCartTotals(updatedCartUpdate);

    default:
      return state;
  }
};

// Create the context
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component to wrap the application with the cart context
export const CartProvider = ({ children }) => {
  // Load cart items from localStorage if available
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return initialState; // Return initial state if no saved cart is found
  };

  const [state, dispatch] = useReducer(cartReducer, loadCartFromLocalStorage());

  // Effect to save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const updateCartItem = (id, quantity) => {
    dispatch({ type: UPDATE_CART_ITEM, payload: { id, quantity } });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        totalAmount: state.totalAmount,
        totalItems: state.totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

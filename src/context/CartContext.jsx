import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'fieldstock_cart';

function loadInitialCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.id);
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return state.filter((item) => item.id !== action.id);
      }
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], loadInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

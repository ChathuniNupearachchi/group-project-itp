import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import './index.css';
import App from './App';
import CartContextProvider from './contexts/CartContext';
import ProductsContextProvider from './contexts/ProductsContext';
import WishlistContextProvider from './contexts/WishlistContext';
import { AppProvider } from './contexts/AppContext';

const root = document.getElementById('root');

const rootContainer = createRoot(root); // Use createRoot from 'react-dom/client'
rootContainer.render(
  <React.StrictMode>
    <ProductsContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </ProductsContextProvider>
  </React.StrictMode>
);

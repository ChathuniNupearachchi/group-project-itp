import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ReactRoot } from 'react-dom'; // Import ReactRoot

import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './components/contexts/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <AppProvider>
      <App2 />
    </AppProvider>
    </Provider>
    
    
  </React.StrictMode>
);

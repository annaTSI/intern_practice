import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';

import {
    BrowserRouter
} from "react-router-dom";

import CartProvider
from "./context/CartContext";

ReactDOM.createRoot(
    document.getElementById('root')
).render(

    <React.StrictMode>

        <BrowserRouter>

            <CartProvider>

                <App />

            </CartProvider>

        </BrowserRouter>

    </React.StrictMode>
);

// UPDATE products

// SET image='https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D'

// WHERE id=6;
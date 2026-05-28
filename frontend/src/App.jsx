import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import EditProduct from "./pages/admin/EditProduct";
import ManageOrders from "./pages/admin/ManageOrders";
import Wishlist from "./pages/Wishlist";


function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Dashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/add-product"
                    element={
                        <AdminRoute>
                            <AddProduct />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/edit-product/:id"
                    element={
                        <AdminRoute>
                            <EditProduct />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <ManageOrders />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />

            </Routes>
            <Footer/>
            
        </>

    );
}

export default App;
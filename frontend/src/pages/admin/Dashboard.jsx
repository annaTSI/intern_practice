import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import API from "../../services/api";

function Dashboard() {

    const [products, setProducts] =
        useState([]);

    const fetchProducts =
    async () => {

        try {

            const res =
                await API.get("/products");

            setProducts(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchProducts();

    }, []);

    const deleteProduct =
    async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete Product?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            const res =
                await API.delete(
                    `/products/${id}`
                );

            alert(res.data.message);

            fetchProducts();

        } catch (error) {

            console.log(error);

            alert(
                "Delete failed"
            );
        }
    };

    return (

        <div
            style={{
                padding:"30px"
            }}
        >

            <h1>
                Admin Dashboard
            </h1>

            <div
                style={{
                    marginBottom:"20px"
                }}
            >

                <Link to="/admin/add-product">

                    <button
                        style={{
                            padding:"10px 15px",
                            cursor:"pointer"
                        }}
                    >
                        Add Product
                    </button>

                </Link>

                <Link to="/admin/orders">

                    <button
                        style={{
                            padding:"10px 15px",
                            marginLeft:"10px",
                            cursor:"pointer"
                        }}
                    >
                        Manage Orders
                    </button>

                </Link>

            </div>

            <table
                border="1"
                width="100%"
                cellPadding="15"
                style={{
                    borderCollapse:"collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Image</th>

                        <th>Name</th>

                        <th>Description</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        products.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    align="center"
                                >
                                    No Products Found
                                </td>

                            </tr>

                        ) : (

                            products.map((product) => (

                                <tr key={product.id}>

                                    <td>
                                        {product.id}
                                    </td>

                                    <td>

                                        <img
                                            src={product.image}
                                            alt={
                                                product.name
                                            }

                                            width="80"
                                            height="80"

                                            style={{
                                                objectFit:"cover"
                                            }}
                                        />

                                    </td>

                                    <td>
                                        {product.name}
                                    </td>

                                    <td>
                                        {
                                            product.description
                                        }
                                    </td>

                                    <td>
                                        ₹ {product.price}
                                    </td>

                                    <td>
                                        {product.stock}
                                    </td>

                                    <td>

                                        <Link
                                            to={`/admin/edit-product/${product.id}`}
                                        >

                                            <button
                                                style={{
                                                    padding:"8px 12px",
                                                    cursor:"pointer"
                                                }}
                                            >
                                                Edit
                                            </button>

                                        </Link>

                                        <button

                                            onClick={() =>
                                                deleteProduct(
                                                    product.id
                                                )
                                            }

                                            style={{
                                                padding:"8px 12px",
                                                marginLeft:"10px",
                                                background:"red",
                                                color:"white",
                                                border:"none",
                                                cursor:"pointer"
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        )
                    }

                </tbody>

            </table>

        </div>
    );
}

export default Dashboard;
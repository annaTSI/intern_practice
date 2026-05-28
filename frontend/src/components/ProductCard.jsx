import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useState,
    useContext
} from "react";

import API from "../services/api";

import {
    CartContext
} from "../context/CartContext";

import "../styles/home.css";


function ProductCard({ product }) {

    const navigate =
        useNavigate();

    const [message,
        setMessage] =
        useState("");
const {

    fetchCartCount,

    fetchWishlistCount

}

=

useContext(
    CartContext
);

    let imageSrc = "";

    if(product.image){

        imageSrc =

        product.image.startsWith(
            "http"
        )

        ?

        product.image

        :

        `http://localhost:5000/${product.image}`;

    }

    else{

        imageSrc =
        "https://via.placeholder.com/300x250?text=No+Image";
    }


   const addToCart =
async () => {

    try{

        const res =
        await API.post(

            "/cart/add",

            {
                product_id:
                product.id
            }
        );

        await fetchCartCount();

        setMessage(
            "✅ Product added to cart"
        );

        setTimeout(()=>{

            setMessage("");

        },1000);

    }

    catch(error){

        console.log(error);
    }
};
    const addToWishlist =
async () => {

    try{

        await API.post(

            "/wishlist/add",

            {
                product_id:
                product.id
            }
        );

       await fetchWishlistCount();

    }

    catch(error){

        console.log(error);
    }
};


    return (

        <div className="product-card">

            <img

                src={imageSrc}

                alt={product.name}

            />

            <h3>

                {product.name}

            </h3>

            <p>

                ₹ {product.price}

            </p>

            


            <Link
                to={`/product/${product.id}`}
            >

                <button
                    className="details-btn"
                >

                    View Details

                </button>

            </Link>


            <button

                className="cart-btn"

                onClick={addToCart}

                disabled={
                    product.stock <= 0
                }

            >

                {
                    product.stock > 0

                    ?

                    "Add To Cart"

                    :

                    "Out Of Stock"
                }

            </button>


            {
                message && (

                    <div

                        style={{

                            color:"green",

                            fontSize:"14px",

                            marginTop:"8px",

                            fontWeight:"bold"

                        }}
                    >

                        {message}

                    </div>
                )
            }

        </div>
    );
}

export default ProductCard;
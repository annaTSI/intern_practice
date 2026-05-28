import {
    useEffect,
    useState,
    useContext
} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import API from "../services/api";

import {
    CartContext
} from "../context/CartContext";

import "../styles/product.css";

function ProductDetails() {

    const { id } = useParams();

    const navigate =
        useNavigate();

    const {
        fetchCartCount
    } = useContext(CartContext);

    const [product, setProduct] =
        useState(null);

    const [reviews, setReviews] =
        useState([]);

    const [rating, setRating] =
        useState(5);

    const [comment, setComment] =
        useState("");
        const [message,
setMessage] =
useState("");

    const fetchProduct =
    async () => {

        try {

            const res =
                await API.get(
                    `/products/${id}`
                );

            setProduct(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchReviews =
    async () => {

        try {

            const res =
                await API.get(
                    `/reviews/${id}`
                );

            setReviews(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchProduct();

        fetchReviews();

    }, []);

    const addToCart =
    async () => {

        if(product.stock <= 0){

            alert(
                "Product Out Of Stock"
            );

            return;
        }

        try {

            await API.post(
                "/cart/add",
                {
                    product_id:
                    product.id,

                    quantity:1
                }
            );

            fetchCartCount();

            alert(
                "Added To Cart"
            );

            navigate("/cart");

        } catch (error) {

            console.log(error);

            alert(
                "Please login"
            );
        }
    };

   const addToWishlist =
async () => {

    try {

        await API.post(
            "/wishlist/add",
            {
                product_id:
                product.id
            }
        );

        setMessage(
            "✅ Added to wishlist successfully!!"
        );

        setTimeout(()=>{

            setMessage("");

        },1000);

    }

    catch(error){

        console.log(error);

        setMessage(
            "Please login"
        );

        setTimeout(()=>{

            setMessage("");

        },1000);
    }
};

   const submitReview =
async () => {

    try {

        await API.post(
            "/reviews",
            {
                product_id:
                product.id,

                rating,

                comment
            }
        );

        setComment("");

        fetchReviews();

        setMessage(
            "✅ Review submitted successfully!!"
        );

        setTimeout(()=>{

            setMessage("");

        },1000);

    }

    catch(error){

        console.log(error);

        setMessage(
            "Please login"
        );

        setTimeout(()=>{

            setMessage("");

        },1000);
    }
};

    if (!product) {

        return <h2>Loading...</h2>;
    }

    let imageSrc = "";

    if(product.image){

        imageSrc =

            product.image.startsWith("http")

            ?

            product.image

            :

            `http://localhost:5000/${product.image}`;
    }
    else{

        imageSrc =
        "https://via.placeholder.com/400x300?text=No+Image";
    }

    return (

        <div className="product-details">

            <img
                src={imageSrc}
                alt={product.name}
            />

            <div>

                <h2>
                    {product.name}
                </h2>

                <p>
                    {product.description}
                </p>

                <h3>
                    ₹ {product.price}
                </h3>

                <h3>
                    Category :
                    {" "}
                    {product.category}
                </h3>

                <h3>

                    Stock :
                    {" "}

                    {
                        product.stock > 0

                        ?

                        product.stock

                        :

                        "Out Of Stock"
                    }

                </h3>

               

                <button

                    onClick={addToWishlist}

                    style={{
                        marginLeft:"10px"
                    }}
                >   
                    Add To Wishlist
                </button>

               {
message && (

<p

style={{

color:"green",

marginTop:"10px",

fontWeight:"bold",

fontSize:"14px"

}}

>

{message}

</p>

)
}
                <hr />

                <h2>
                    Reviews
                </h2>

                <div
                    style={{
                        marginTop:"20px"
                    }}
                >

                    <select

                        value={rating}

                        onChange={(e)=>
                            setRating(
                                e.target.value
                            )
                        }
                    >

                        <option value="5">
                            5 Star
                        </option>

                        <option value="4">
                            4 Star
                        </option>

                        <option value="3">
                            3 Star
                        </option>

                        <option value="2">
                            2 Star
                        </option>

                        <option value="1">
                            1 Star
                        </option>

                    </select>

                    <br /><br />

                    <textarea

                        placeholder=
                        "Write Review"

                        value={comment}

                        onChange={(e)=>
                            setComment(
                                e.target.value
                            )
                        }

                        rows="4"

                        style={{
                            width:"300px"
                        }}
                    />

                    <br /><br />

                    <button

    onClick={submitReview}

    disabled={
        !comment.trim()
    }

    style={{

        background:
        !comment.trim()

        ?

        "#ccc"

        :

        "black",

        color:"white",

        padding:"10px",

        border:"none",

        borderRadius:"5px",

        cursor:

        !comment.trim()

        ?

        "not-allowed"

        :

        "pointer"

    }}
>

    Submit Review

</button>

                </div>

                <hr />

                {
                    reviews.length === 0

                    ?

                    (

                        <p>
                            No Reviews Yet
                        </p>
                    )

                    :

                    (

                        reviews.map((review)=>(

                            <div
                                key={review.id}

                                style={{
                                    marginBottom:"20px"
                                }}
                            >

                                <h4>
                                    {review.name}
                                </h4>

                                <p>
                                    ⭐ {review.rating}/5
                                </p>

                                <p>
                                    {review.comment}
                                </p>

                            </div>
                        ))
                    )
                }

            </div>

        </div>
    );
}

export default ProductDetails; 
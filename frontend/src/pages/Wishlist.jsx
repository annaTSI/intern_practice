import {
    useEffect,
    useState,
    useContext
} from "react";

import API from "../services/api";

import {
    CartContext
} from "../context/CartContext";

function Wishlist() {

    const [items,setItems] =
    useState([]);

    const {

        fetchWishlistCount

    }

    =

    useContext(
        CartContext
    );



    const fetchWishlist =
    async()=>{

        try{

            const res =
            await API.get(
                "/wishlist"
            );

            setItems(
                res.data
            );

        }

        catch(error){

            console.log(error);
        }
    };


    useEffect(()=>{

        fetchWishlist();

    },[]);



    const removeWishlist =
    async(id)=>{

        try{

            await API.delete(

                `/wishlist/${id}`

            );

            fetchWishlist();

            fetchWishlistCount();

        }

        catch(error){

            console.log(error);
        }
    };


    return(

        <div
        style={{
            padding:"30px"
        }}
        >

        <h2>
            My Wishlist
        </h2>

        <div
        className=
        "home-container"
        >

        {

        items.map(
        (item)=>(

        <div

        key={item.id}

        className=
        "product-card"

        >

        <img

        src={

        item.image?.startsWith(
        "http"
        )

        ?

        item.image

        :

        `http://localhost:5000/${item.image}`
        }

        alt=""
        />

        <h3>
            {item.name}
        </h3>

        <p>
            ₹ {item.price}
        </p>

        <p>
            {item.category}
        </p>

        <button

    onClick={() =>
        removeWishlist(item.id)
    }

    style={{

        background:"#c9a96e",

        color:"black",

        border:"none",

        padding:"8px 16px",

        borderRadius:"6px",

        cursor:"pointer",

        marginTop:"10px"
    }}
>

    Remove

</button>

        </div>

        ))

        }

        </div>

        </div>

    );
}

export default Wishlist;
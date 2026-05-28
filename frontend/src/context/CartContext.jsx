import {
    createContext,
    useEffect,
    useState
} from "react";

import API from "../services/api";

export const CartContext =
createContext();

function CartProvider({ children }) {

    const [cartCount,
        setCartCount] =
        useState(0);

    const [wishlistCount,
        setWishlistCount] =
        useState(0);

    const fetchCartCount =
    async () => {

        try{

            const res =
            await API.get(
                "/cart"
            );

            const total =
            res.data.reduce(

                (acc,item)=>

                acc+
                item.quantity,

                0
            );

            setCartCount(
                total
            );

        }

        catch(error){

            console.log(error);
        }
    };



    const fetchWishlistCount =
    async()=>{

        try{

            const res =
            await API.get(
                "/wishlist"
            );

            setWishlistCount(

                res.data.length
            );

        }

        catch(error){

            console.log(error);
        }

    };


    useEffect(()=>{

        fetchCartCount();

        fetchWishlistCount();

    },[]);


    return(

        <CartContext.Provider

        value={{

            cartCount,

            wishlistCount,

            fetchCartCount,

            fetchWishlistCount

        }}

        >

            {children}

        </CartContext.Provider>

    );
}

export default CartProvider;
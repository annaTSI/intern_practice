import {
    useEffect,
    useState,
    useContext
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../services/api";

import {
    CartContext
} from "../context/CartContext";

function Cart() {

    const [cartItems,
        setCartItems] =
        useState([]);

    const navigate =
        useNavigate();

    const {
        fetchCartCount
    } = useContext(CartContext);

    const fetchCart =
    async () => {

        try {

            const res =
                await API.get("/cart");

            setCartItems(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchCart();

    }, []);

    const updateQuantity =
    async (
        id,
        quantity,
        stock
    ) => {

        if(quantity < 1){
            return;
        }

        if(quantity > stock){

            alert(
                "Stock limit reached"
            );

            return;
        }

        try {

            await API.put(
                `/cart/update/${id}`,
                { quantity }
            );

            fetchCart();

            fetchCartCount();

        } catch (error) {

            console.log(error);
        }
    };

    const removeItem =
    async (id) => {

        try {

            await API.delete(
                `/cart/remove/${id}`
            );

            fetchCart();

            fetchCartCount();

        } catch (error) {

            console.log(error);
        }
    };

    const subtotal =
        cartItems.reduce(

            (acc, item)=>

                acc +
                item.price *
                item.quantity,

            0
        );

    const deliveryFee =
        subtotal > 0 ? 50 : 0;

    const convenienceFee =
        subtotal > 0 ? 20 : 0;

    const total =
        subtotal +
        deliveryFee +
        convenienceFee;

    return (

        <div
            style={{
                padding:"30px",
                
            }}
        >

            <h1
            style={{
                marginBottom:"20px"
            }}>
                My Cart
            </h1>

            {
                cartItems.length === 0

                ?

                (

                    <h2>
                        Cart Empty
                    </h2>
                )

                :

                (

                    cartItems.map((item)=>(

                        <div

                            key={item.id}

                            style={{

                                display:"flex",

                                gap:"20px",

                                border:"1px solid gray",

                                padding:"20px",

                                marginBottom:"20px"
                            }}
                        >

                            <img

                                src={

                                    item.image?.startsWith("http")

                                    ?

                                    item.image

                                    :

                                    `http://localhost:5000/${item.image}`
                                }

                                alt=""

                                width="180"

                                height="180"

                                style={{
                                    objectFit:"cover"
                                }}
                            />

                            <div>

                                <h2>
                                    {item.name}
                                </h2>

                                <h3 style={{
                                    marginTop:"5px"
                                }}>
                                    Price :
                                    ₹ {item.price}
                                </h3>

                                <div
                                    style={{
                                        display:"flex",
                                        gap:"10px",
                                        alignItems:"center",
                                        margin:"20px 0"
                                    }}
                                >

                                    <button

                                        onClick={()=>

                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1,
                                                item.stock
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <h3>
                                        {item.quantity}
                                    </h3>

                                    <button

                                        onClick={()=>

                                            updateQuantity(
                                                item.id,
                                                item.quantity + 1,
                                                item.stock
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <h2>

                                    Total :
                                    ₹ {

                                        item.price *
                                        item.quantity
                                    }

                                </h2>

                                <button

                                    onClick={()=>
                                        removeItem(item.id)
                                    }

                                    style={{
                                        marginTop:"10px",
                                        background:"#c9a96e",
                                        color:"black",
                                    borderRadius:"10px",
                                        padding:"10px",
                                        cursor:"pointer"
                                    }}
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    ))
                )
            }

            {
                cartItems.length > 0 && (

                    <div >

                        <h2 style={{
                marginBottom:"4px"
            }} >

                            Subtotal :
                            ₹ {subtotal}
                        </h2>
                        

                        <h2 style={{
                marginBottom:"4px"
            }}>
                            Delivery Fee :
                            ₹ {deliveryFee}
                        </h2>

                        <h2 style={{
                marginBottom:"4px"
            }}>
                            Convenience Fee :
                            ₹ {convenienceFee}
                        </h2>

                        <h1 >
                            Grand Total :
                            ₹ {total}
                        </h1>

                        <button

                            onClick={()=>
                                navigate("/checkout")
                            }

                            style={{

                                marginTop:"20px",

                                padding:"12px 25px",

                               background:"#c9a96e",
                               

                                color:"black",
 
                                border:"none",

                                cursor:"pointer",

                                fontSize:"18px",

                                borderRadius:"8px"
                            }}
                        >

                            Place Order

                        </button>

                    </div>
                )
            }

        </div>
    );
}

export default Cart;
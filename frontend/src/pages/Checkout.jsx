import {
    useEffect,
    useState
} from "react";

import API from "../services/api";

import { useNavigate }
from "react-router-dom";

function Checkout() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] =
        useState([]);

    const [address, setAddress] =
        useState("");

    const [phone, setPhone] =
        useState("");
    const [addressError,
    setAddressError] =
    useState("");

const [phoneError,
    setPhoneError] =
    useState("");
    const fetchCart = async () => {

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

    const subtotal =
        cartItems.reduce(
            (acc, item) => {

                return acc +
                item.price *
                item.quantity;
            },
            0
        );

    const deliveryFee = 50;

    const convenienceFee = 20;

    const totalAmount =
        subtotal +
        deliveryFee +
        convenienceFee;

   const placeOrder =
async () => {

    setAddressError("");
    setPhoneError("");

    // ADDRESS VALIDATION

    if(!address.trim()){

        setAddressError(
            "Please enter address"
        );

        return;
    }

    if(address.trim().length < 10){

        setAddressError(
            "Address too short"
        );

        return;
    }

    // PHONE VALIDATION

    if(!phone.trim()){

        setPhoneError(
            "Please enter phone number"
        );

        return;
    }

    const phoneRegex =
    /^[0-9]+$/;

    if(!phoneRegex.test(phone)){

        setPhoneError(
            "Phone must contain only numbers"
        );

        return;
    }

    if(phone.length !== 10){

        setPhoneError(
            "Phone number must be 10 digits"
        );

        return;
    }

    try {

        const res =
            await API.post(
                "/orders/place-order",
                {
                    address,
                    phone
                }
            );

        navigate("/orders");

    } catch (error) {

        console.log(error);
    }
};
    return (

        <div
            style={{
                padding:"30px"
            }}
        >

            <h2>Checkout</h2>

            <textarea

                rows="5"

                placeholder=
                "Enter delivery address"

                value={address}

                onChange={(e)=>
                    setAddress(
                        e.target.value
                    )
                }

                style={{
                    width:"400px",
                    backgroundColor:"rgba(255,255,255,0.04)",
                    color:"white",
                    padding:"10px",
                    marginBottom:"15px",
                    marginTop:"20px"
                    
                }}
            />
            {
    addressError && (

        <p
            style={{
    color:"white",
    marginTop:"1px",
    marginBottom:"20px",
    marginLeft:"20px",
    fontSize:"14px"
}}
        >
            {addressError}
        </p>
    )
}

            <input

                type="text"

                placeholder=
                "Enter Phone Number"

                value={phone}

                onChange={(e)=>
                    setPhone(
                        e.target.value
                    )
                }

                style={{
                    width:"400px",
                    backgroundColor:"rgba(255,255,255,0.04)",
                    color:"white",
                    padding:"10px",
                    marginBottom:"25px",
                    display:"block"
                }}
            />
{
    phoneError && (

        <p
            style={{
    color:"white",
    marginTop:"4px",
    marginBottom:"8px",
     marginLeft:"20px",
    fontSize:"14px"
}}
        >
            {phoneError}
        </p>
    )
}
            <h3>
                Subtotal :
                ₹ {subtotal}
            </h3>

            <h3>
                Delivery Fee :
                ₹ {deliveryFee}
            </h3>

            <h3>
                Convenience Fee :
                ₹ {convenienceFee}
            </h3>

            <h2 style={{
                marginTop:"10px",
            }}>
                Total :
                ₹ {totalAmount}
            </h2>

            <button
                onClick={placeOrder}

                style={{
                    padding:"8px 20px",
                    cursor:"pointer",
                    backgroundColor:"#cfa45e",
                    borderRadius:"10px",
                    marginTop:"15px"
                }}
            >
                Place Order
            </button>

        </div>
    );
}

export default Checkout;
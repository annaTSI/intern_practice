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
        const [paymentMethod,
    setPaymentMethod] =
    useState("COD");
    const [addressError,
    setAddressError] =
    useState("");
   const [suggestions,
    setSuggestions] =
    useState([]);

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
        const searchAddress =
async (value) => {

    setAddress(value);

    if(value.length < 3){

        setSuggestions([]);

        return;
    }

    try{

        const res =
        await fetch(

`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=d26871b8ebaa49dab90dae7876c5bb71`

        );

        const data =
        await res.json();

        setSuggestions(
            data.features || []
        );

    }catch(error){

        console.log(error);
    }
};const getCurrentLocation = () => {

    if(!navigator.geolocation){

        alert(
            "Geolocation not supported"
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const lat =
            position.coords.latitude;

            const lon =
            position.coords.longitude;
            console.log("Latitude:", lat);
console.log("Longitude:", lon);
            try{

                const res =
                await fetch(

`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=d26871b8ebaa49dab90dae7876c5bb71`

                );

                const data =
                await res.json();

                if(
                    data.features &&
                    data.features.length > 0
                ){

                    setAddress(

                        data.features[0]
                        .properties
                        .formatted

                    );
                }

            }catch(error){

                console.log(error);
            }
        },

(error) => {

    console.log(error);

    alert(error.message);

    console.log(
        "Code:",
        error.code
    );
},

{
    enableHighAccuracy:true,
    timeout:10000,
    maximumAge:0
}
);
};

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
        

        console.log("Selected Payment:", paymentMethod);

if(paymentMethod === "ONLINE"){

    const paymentRes =
    await API.post(
        "/orders/create-payment",
        {
            amount: totalAmount
        }
    );

    const options = {

        key:
        "rzp_test_SxQirBFjQeAScY",

        amount:
        paymentRes.data.amount,

        currency:
        paymentRes.data.currency,

        name:
        "E-Commerce Store",

        description:
        "Order Payment",

        order_id:
        paymentRes.data.id,

        handler:
        async function(response){

            await API.post(
                "/orders/place-order",
                {
                    address,
                    phone,
                    paymentMethod,
                    razorpay_payment_id:
                    response.razorpay_payment_id
                }
            );

            alert(
                "Payment Successful"
            );

            navigate("/orders");
        },

        theme:{
            color:"#cfa45e"
        }
    };

    const razorpay =

    new window.Razorpay(
        options
    );

    razorpay.open();

}

else{

    await API.post(
        "/orders/place-order",
        {
            address,
            phone,
            paymentMethod
        }
    );

    navigate("/orders");
}

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

            



<input

    type="text"

    placeholder=
    "Search Delivery Address"

    value={address}

    onChange={(e)=>

        searchAddress(
            e.target.value
        )
    }

    style={{

        width:"400px",

        backgroundColor:
        "rgba(255,255,255,0.04)",

        color:"white",

        padding:"10px",

        marginBottom:"15px",

        marginTop:"20px"
    }}
/>
{
suggestions.length > 0 && (

<div
style={{

background:"#1a1a1a",

width:"400px",

border:"1px solid #444",

maxHeight:"200px",

overflowY:"auto"
}}
>

{
suggestions.map(
(place,index)=>(

<div

key={index}

onClick={()=>{

setAddress(

place.properties
.formatted
);

setSuggestions([]);
}}

style={{

padding:"10px",

cursor:"pointer",

borderBottom:
"1px solid #333"
}}
>

{
place.properties
.formatted
}

</div>

))
}

</div>

)
}
<button

    type="button"

    onClick={getCurrentLocation}

    style={{

        padding:"10px",

        marginTop:"10px",

        background:"#cfa45e",

        color:"black",

        border:"none",

        borderRadius:"8px",

        cursor:"pointer"
    }}
>

📍 Use My Current Location

</button>



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
<h3>Select Payment Method</h3>

<div style={{marginBottom:"20px"}}>

    <label>

        <input
            type="radio"
            value="COD"
            checked={
                paymentMethod === "COD"
            }
            onChange={(e)=>
                setPaymentMethod(
                    e.target.value
                )
            }
        />

        Cash On Delivery

    </label>

    <br/><br/>

    <label>

        <input
    type="radio"
    value="ONLINE"
    checked={
        paymentMethod === "ONLINE"
    }
    onChange={(e)=>
        setPaymentMethod(
            e.target.value
        )
    }
/>

        Online Payment

    </label>

</div>
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
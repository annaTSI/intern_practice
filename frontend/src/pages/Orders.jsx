import {
    useEffect,
    useState
} from "react";

import API from "../services/api";

function Orders() {

    const [orders, setOrders] =
        useState([]);

    const fetchOrders =
    async () => {

        try {

            const res =
                await API.get(
                    "/orders/my-orders"
                );

            setOrders(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    const cancelOrder =
    async (id) => {

        try {

            const res =
                await API.put(
                    `/orders/cancel/${id}`
                );

            fetchOrders();

        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message

                ||

                "Order Cancel Failed"
            );
        }
    };

    const downloadInvoice =
    (orderId) => {

        window.open(

            `http://localhost:5000/api/orders/invoice/${orderId}`,

            "_blank"
        );
    };

    return (

        <div
            style={{
                padding:"30px"
            }}
        >

            <h1>
                My Orders
            </h1>

            {
                orders.map((order)=>(

                    <div

                        key={order.order_id}

                        style={{

                            border:"1px solid gray",

                            padding:"20px",

                            marginBottom:"20px"
                        }}
                    >

                        <h2>
                            Order ID :
                            {order.order_id}
                        </h2>

                        <h3>
                            Address :
                            {order.address}
                        </h3>

                        <h3>

                            Phone :
                            {order.phone}

                        </h3>

                        <h3>
                            Total :
                            ₹ {order.total_amount}
                        </h3>

                        <h3>
                            Payment Method :
                            {order.payment_method}
                        </h3>

                        <h3>

                            Payment Status :

                            <span
                                style={{

                                    color:

                                    order.payment_status === "Paid"

                                    ?

                                    "lightgreen"

                                    :

                                    "#c9a96e",

                                    marginLeft:"8px"
                                }}
                            >
                                {order.payment_status}
                            </span>

                        </h3>

                        <h3>
                            Status :
                            {order.status}
                        </h3>

                        <div
                            style={{
                                marginTop:"15px"
                            }}
                        >

                            {
                                order.status === "Placed" && (

                                    <button

                                        onClick={()=>
                                            cancelOrder(
                                                order.order_id
                                            )
                                        }

                                        style={{

                                            padding:"10px",

                                            background:"#c9a96e",

                                            color:"black",

                                            border:"none",

                                            cursor:"pointer"
                                        }}
                                    >

                                        Cancel Order

                                    </button>
                                )
                            }

                            {
                                order.payment_status === "Paid" &&
                                order.status === "Delivered" && (

                                    <button

                                        onClick={()=>
                                            downloadInvoice(
                                                order.order_id
                                            )
                                        }

                                        style={{

                                            marginLeft:"10px",

                                            padding:"10px",

                                            background:"green",

                                            color:"white",

                                            border:"none",

                                            cursor:"pointer"
                                        }}
                                    >

                                        Download Invoice

                                    </button>
                                )
                            }

                        </div>

                    </div>
                ))
            }

        </div>
    );
}

export default Orders;
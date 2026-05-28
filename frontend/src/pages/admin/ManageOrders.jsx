import {
    useEffect,
    useState
} from "react";

import API from "../../services/api";

function ManageOrders() {

    const [orders, setOrders] =
        useState([]);

    const fetchOrders =
    async () => {

        try {

            const res =
                await API.get(
                    "/orders/admin/all-orders"
                );

            setOrders(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    const updateStatus =
    async (id, status) => {

        try {

            const res =
                await API.put(
                    `/orders/admin/update-status/${id}`,
                    { status }
                );

            alert(res.data.message);

            fetchOrders();

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

            <h1>
                Manage Orders
            </h1>

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

                        <th>
                            Order ID
                        </th>

                        <th>
                            User
                        </th>

                        <th>
                            Product
                        </th>

                        <th>
                            Image
                        </th>

                        <th>
                            Quantity
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Address
                        </th>
                        <th>
    Phone
</th>

                        <th>
                            Total
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        orders.map((order,index) => (

                            <tr
                                key={index}
                            >

                                <td>
                                    {order.order_id}
                                </td>

                                <td>
                                    {order.user_name}
                                </td>

                                <td>
                                    {order.product_name}
                                </td>

                                <td>

                                    <img

                                        src={

                                            order.image?.startsWith("http")

                                            ?

                                            order.image

                                            :

                                            `http://localhost:5000/${order.image}`
                                        }

                                        alt=""

                                        width="80"

                                        height="80"

                                        style={{
                                            objectFit:"cover"
                                        }}
                                    />

                                </td>

                                <td>
                                    {order.quantity}
                                </td>

                                <td>
                                    ₹ {order.price}
                                </td>

                                <td>
                                    {order.address}
                                </td>
                                <td>
    {order.phone}
</td>

                                <td>
                                    ₹ {order.total_amount}
                                </td>

                                <td>
                                    {order.status}
                                </td>

                                <td>

                                    <select

                                        value={
                                            order.status
                                        }

                                        onChange={(e)=>

                                            updateStatus(
                                                order.order_id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option>
                                            Placed
                                        </option>

                                        <option>
                                            Packed
                                        </option>

                                        <option>
                                            Shipped
                                        </option>

                                        <option>
                                            Delivered
                                        </option>

                                    </select>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default ManageOrders;
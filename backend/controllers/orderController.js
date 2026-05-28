const db = require("../config/db");


// PLACE ORDER

exports.placeOrder =
(req, res) => {

    if(!req.session.user){

        return res.status(401).json({
            message:"Login required"
        });
    }

    const user_id =
        req.session.user.id;

    const {
    address,
    phone
} = req.body;

    const cartSql =

    `SELECT

        cart.*,

        products.price,

        products.stock

    FROM cart

    JOIN products
    ON cart.product_id = products.id

    WHERE cart.user_id=?`;

    db.query(
        cartSql,
        [user_id],
        (err, cartItems) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            if(cartItems.length === 0){

                return res.status(400).json({
                    message:"Cart Empty"
                });
            }

            // STOCK CHECK

            for(let item of cartItems){

                if(item.quantity > item.stock){

                    return res.status(400).json({

                        message:
                        "Stock not available"
                    });
                }
            }

            // TOTAL

            let subtotal = 0;

            cartItems.forEach((item)=>{

                subtotal +=
                    item.price *
                    item.quantity;
            });

            const deliveryFee = 50;

            const convenienceFee = 20;

            const total_amount =

                subtotal +
                deliveryFee +
                convenienceFee;

            // INSERT ORDER

            const orderSql =

            `INSERT INTO orders
(
    user_id,
    total_amount,
    address,
    phone,
    status
)

VALUES (?,?,?,?,?)`;

            db.query(
                orderSql,
                [
                    user_id,
                    total_amount,
                    address,
                    phone,
                    "Placed"
                ],
                (err2, orderResult) => {

                    if(err2){

                        console.log(err2);

                        return res.status(500).json(err2);
                    }

                    const order_id =
                        orderResult.insertId;

                    // INSERT ORDER ITEMS

                    cartItems.forEach((item)=>{

                        const itemSql =

                        `INSERT INTO order_items
                        (
                            order_id,
                            product_id,
                            quantity,
                            price
                        )

                        VALUES (?,?,?,?)`;

                        db.query(
                            itemSql,
                            [
                                order_id,
                                item.product_id,
                                item.quantity,
                                item.price
                            ]
                        );

                        // UPDATE STOCK

                        const stockSql =

                        `UPDATE products

                         SET stock =
                         stock - ?

                         WHERE id=?`;

                        db.query(
                            stockSql,
                            [
                                item.quantity,
                                item.product_id
                            ]
                        );
                    });

                    // CLEAR CART

                    const clearCartSql =

                    `DELETE FROM cart
                     WHERE user_id=?`;

                    db.query(
                        clearCartSql,
                        [user_id]
                    );

                    res.json({

                        message:
                        "Order Placed"
                    });
                }
            );
        }
    );
};



// GET MY ORDERS

exports.getMyOrders =
(req, res) => {

    if (!req.session.user) {

        return res.status(401).json({
            message: "Login required"
        });
    }

    const sql =

    `SELECT

        orders.id AS order_id,

        orders.address,
        orders.phone,

        orders.total_amount,

        orders.status,

        products.name AS product_name,

        products.image,

        order_items.quantity,

        order_items.price

    FROM orders

    JOIN order_items
    ON orders.id = order_items.order_id

    JOIN products
    ON order_items.product_id = products.id

    WHERE orders.user_id=?

    ORDER BY orders.id DESC`;

    db.query(
        sql,
        [req.session.user.id],
        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};



// GET ALL ORDERS (ADMIN)

exports.getAllOrders =
(req, res) => {

    const sql =

    `SELECT

        orders.id AS order_id,

        orders.total_amount,

        orders.address,
        orders.phone,

        orders.status,

        users.name AS user_name,

        products.name AS product_name,

        products.image,

        order_items.quantity,

        order_items.price

    FROM orders

    JOIN users
    ON orders.user_id = users.id

    JOIN order_items
    ON orders.id = order_items.order_id

    JOIN products
    ON order_items.product_id = products.id

    ORDER BY orders.id DESC`;

    db.query(
        sql,
        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};



// UPDATE ORDER STATUS

exports.updateOrderStatus =
(req, res) => {

    const { status } =
        req.body;

    const sql =

    `UPDATE orders

     SET status=?

     WHERE id=?`;

    db.query(
        sql,
        [
            status,
            req.params.id
        ],
        (err) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            res.json({

                message:
                "Order Status Updated"
            });
        }
    );
};



// CANCEL ORDER

exports.cancelOrder =
(req, res) => {

    try {

        if(!req.session.user){

            return res.status(401).json({
                message:
                "Login required"
            });
        }

        const orderId =
            req.params.id;

        const checkSql =

        `SELECT *
         FROM orders

         WHERE id=?
         AND user_id=?`;

        db.query(
            checkSql,
            [
                orderId,
                req.session.user.id
            ],
            (err, result) => {

                if(err){

                    console.log(err);

                    return res.status(500).json({
                        message:
                        "Database Error"
                    });
                }

                if(result.length === 0){

                    return res.status(404).json({
                        message:
                        "Order not found"
                    });
                }

                const order =
                    result[0];

                if(order.status !== "Placed"){

                    return res.status(400).json({

                        message:
                        "Cannot cancel this order"
                    });
                }

                const sql =

                `UPDATE orders

                 SET status='Cancelled'

                 WHERE id=?`;

                db.query(
                    sql,
                    [orderId],
                    (err2) => {

                        if(err2){

                            console.log(err2);

                            return res.status(500).json({
                                message:
                                "Cancel Failed"
                            });
                        }

                        res.json({

                            message:
                            "Order Cancelled"
                        });
                    }
                );
            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
            "Server Error"
        });
    }
};
const db = require("../config/db");


exports.addToCart =
(req, res) => {

    if(!req.session.user){

        return res.status(401).json({
            message:"Login required"
        });
    }

    const user_id =
        req.session.user.id;

    const { product_id } =
        req.body;

    const checkSql = `
        SELECT *
        FROM cart
        WHERE user_id=?
        AND product_id=?
    `;

    db.query(
        checkSql,
        [
            user_id,
            product_id
        ],
        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500)
                .json(err);
            }

            // PRODUCT ALREADY EXISTS

            if(result.length > 0){

                const updateSql = `
                    UPDATE cart
                    SET quantity =
                    quantity + 1
                    WHERE user_id=?
                    AND product_id=?
                `;

                db.query(
                    updateSql,
                    [
                        user_id,
                        product_id
                    ],
                    (err2) => {

                        if(err2){

                            console.log(err2);

                            return res
                            .status(500)
                            .json(err2);
                        }

                        res.json({
                            message:
                            "Cart Updated"
                        });
                    }
                );
            }

            // NEW PRODUCT

            else{

                const sql = `
                    INSERT INTO cart
                    (
                        user_id,
                        product_id,
                        quantity
                    )
                    VALUES (?,?,?)
                `;

                db.query(
                    sql,
                    [
                        user_id,
                        product_id,
                        1
                    ],
                    (err3) => {

                        if(err3){

                            console.log(err3);

                            return res
                            .status(500)
                            .json(err3);
                        }

                        res.json({
                            message:
                            "Added To Cart"
                        });
                    }
                );
            }
        }
    );
};



// GET CART

exports.getCart =
(req, res) => {

    if(!req.session.user){

        return res.status(401).json({
            message:"Login required"
        });
    }

    const sql =

    `SELECT

        cart.id,

        cart.quantity,

        products.name,

        products.price,

        products.image,

        products.stock

    FROM cart

    JOIN products
    ON cart.product_id = products.id

    WHERE cart.user_id=?`;

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



// UPDATE CART QUANTITY

exports.updateCart =
(req, res) => {

    const { quantity } =
        req.body;

    const sql =

    `UPDATE cart

     SET quantity=?

     WHERE id=?`;

    db.query(
        sql,
        [
            quantity,
            req.params.id
        ],
        (err) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            res.json({
                message:
                "Cart Updated"
            });
        }
    );
};



// REMOVE CART ITEM

exports.removeCartItem =
(req, res) => {

    const sql =

    `DELETE FROM cart
     WHERE id=?`;

    db.query(
        sql,
        [req.params.id],
        (err) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            res.json({
                message:
                "Item Removed"
            });
        }
    );
};
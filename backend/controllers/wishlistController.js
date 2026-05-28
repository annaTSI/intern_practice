const db = require("../config/db");

exports.addToWishlist =
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

    const checkSql =

    `SELECT *
     FROM wishlist
     WHERE user_id=?
     AND product_id=?`;

    db.query(
        checkSql,
        [user_id, product_id],
        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            if(result.length > 0){

                return res.json({
                    message:
                    "Already In Wishlist"
                });
            }

            const sql =

            `INSERT INTO wishlist
            (
                user_id,
                product_id
            )

            VALUES (?,?)`;

            db.query(
                sql,
                [
                    user_id,
                    product_id
                ],
                (err2) => {

                    if(err2){

                        console.log(err2);

                        return res.status(500).json(err2);
                    }

                    res.json({
                        message:
                        "Added To Wishlist"
                    });
                }
            );
        }
    );
};

exports.getWishlist =
(req, res) => {

    if(!req.session.user){

        return res.status(401).json({
            message:"Login required"
        });
    }

    const sql =

    `SELECT

        wishlist.id,

        products.name,

        products.price,

        products.image,

        products.category

    FROM wishlist

    JOIN products
    ON wishlist.product_id = products.id

    WHERE wishlist.user_id=?`;

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

exports.removeWishlist =
(req, res) => {

    const sql =

    `DELETE FROM wishlist
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
                "Removed From Wishlist"
            });
        }
    );
};
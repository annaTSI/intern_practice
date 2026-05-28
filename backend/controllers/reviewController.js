const db = require("../config/db");

exports.addReview =
(req, res) => {

    if(!req.session.user){

        return res.status(401).json({
            message:"Login required"
        });
    }

    const user_id =
        req.session.user.id;

    const {
        product_id,
        rating,
        comment
    } = req.body;

    const sql =

    `INSERT INTO reviews
    (
        user_id,
        product_id,
        rating,
        comment
    )

    VALUES (?,?,?,?)`;

    db.query(
        sql,
        [
            user_id,
            product_id,
            rating,
            comment
        ],
        (err) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            res.json({
                message:
                "Review Added"
            });
        }
    );
};

exports.getReviews =
(req, res) => {

    const sql =

    `SELECT

        reviews.*,

        users.name

    FROM reviews

    JOIN users
    ON reviews.user_id = users.id

    WHERE product_id=?

    ORDER BY reviews.id DESC`;

    db.query(
        sql,
        [req.params.productId],
        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};
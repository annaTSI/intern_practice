const db = require("../config/db");

exports.getProducts = (req, res) => {

    const sql =
        "SELECT * FROM products";

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json(err);
        }

        res.json(result);
    });
};

exports.getSingleProduct =
(req, res) => {

    const sql =
        "SELECT * FROM products WHERE id=?";

    db.query(
        sql,
        [req.params.id],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);
            }

            res.json(result[0]);
        }
    );
};

exports.addProduct =
(req, res) => {

    const {
        name,
        description,
        price,
        stock,
        category,
        imageUrl
    } = req.body;

    let image = "";

    if(req.file){

        image =
        `uploads/${req.file.filename}`;
    }

    else if(

        imageUrl &&
        imageUrl.trim() !== ""

    ){

        image =
        imageUrl.trim();
    }

    const sql =

    `INSERT INTO products
    (
        name,
        description,
        price,
        stock,
        image,
        category
    )

    VALUES (?,?,?,?,?,?)`;

    db.query(

        sql,

        [
            name,
            description,
            price,
            stock,
            image,
            category
        ],

        (err)=>{

            if(err){

                console.log(err);

                return res
                .status(500)
                .json(err);
            }

            res.json({

                message:
                "Product Added"

            });

        }

    );

};
exports.updateProduct =
(req, res) => {

    const {
        name,
        description,
        price,
        stock,
        category,
        imageUrl
    } = req.body;

    let image = "";

    if(req.file){

        image =
        `uploads/${req.file.filename}`;
    }

    else if(

        imageUrl &&
        imageUrl.trim() !== ""

    ){

        image =
        imageUrl.trim();
    }

    const sql =

    `UPDATE products

    SET

    name=?,
    description=?,
    price=?,
    stock=?,
    image=?,
    category=?

    WHERE id=?`;

    db.query(

        sql,

        [
            name,
            description,
            price,
            stock,
            image,
            category,
            req.params.id
        ],

        (err)=>{

            if(err){

                console.log(err);

                return res
                .status(500)
                .json(err);
            }

            res.json({

                message:
                "Product Updated"

            });

        }

    );

};
exports.deleteProduct =
(req, res) => {

    const sql =
        "DELETE FROM products WHERE id=?";

    db.query(
        sql,
        [req.params.id],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);
            }

            res.json({
                message:
                "Product Deleted"
            });
        }
    );
};
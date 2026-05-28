const db =
require("../config/db");


// REGISTER

exports.register =
(req, res) => {

    const {

        name,

        email,

        password

    } = req.body;

    const checkSql =

    `SELECT *
     FROM users

     WHERE email=?`;

    db.query(
        checkSql,
        [email],
        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            if(result.length > 0){

                return res.status(400).json({

                    message:
                    "Email already exists"
                });
            }

            const sql =

            `INSERT INTO users
            (
                name,
                email,
                password,
                role
            )

            VALUES (?,?,?,?)`;

            db.query(
                sql,
                [
                    name,
                    email,
                    password,
                    "user"
                ],

                (err2) => {

                    if(err2){

                        console.log(err2);

                        return res.status(500).json(err2);
                    }

                    res.json({

                        message:
                        "Registered Successfully"
                    });
                }
            );
        }
    );
};



// LOGIN

exports.login =
(req, res) => {

    const {

        email,

        password

    } = req.body;

    const sql =

    `SELECT *
     FROM users

     WHERE email=?
     AND password=?`;

    db.query(
        sql,
        [
            email,
            password
        ],

        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            console.log(result);

            if(result.length === 0){

                return res.status(401).json({

                    message:
                    "Invalid credentials"
                });
            }

            req.session.user = {

                id:
                result[0].id,

                name:
                result[0].name,

                email:
                result[0].email,

                role:
                result[0].role
            };

            res.json({

                message:
                "Login Successful",

                user:
                req.session.user
            });
        }
    );
};



// LOGOUT

exports.logout =
(req, res) => {

    req.session.destroy(()=>{

        res.json({

            message:
            "Logout Successful"
        });
    });
};



// CHECK AUTH

exports.checkAuth =
(req, res) => {

    if(req.session.user){

        res.json({

            user:
            req.session.user
        });

    } else {

        res.status(401).json({

            message:
            "Not logged in"
        });
    }
};



// UPDATE PROFILE

exports.updateProfile =
(req, res) => {

    if(!req.session.user){

        return res.status(401).json({

            message:
            "Login required"
        });
    }

    const {

        name,

        email,

        password

    } = req.body;

    const sql =

    `UPDATE users

     SET

     name=?,
     email=?,
     password=?

     WHERE id=?`;

    db.query(
        sql,
        [

            name,

            email,

            password,

            req.session.user.id
        ],

        (err) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);
            }

            req.session.user = {

                ...req.session.user,

                name,
                email
            };

            res.json({

                message:
                "Profile Updated"
            });
        }
    );
};
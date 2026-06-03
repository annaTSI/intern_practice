const express = require("express");

const cors = require("cors");

const session =
require("express-session");

require("dotenv").config();

const app = express();


// ROUTES

const authRoutes =
require("./routes/authRoutes");

const productRoutes =
require("./routes/productRoutes");

const cartRoutes =
require("./routes/cartRoutes");

const orderRoutes =
require("./routes/orderRoutes");
const wishlistRoutes =
require("./routes/wishlistRoutes");
const reviewRoutes =
require("./routes/reviewRoutes");

// MIDDLEWARES

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


// CORS

app.use(cors({

    origin:[
        "http://localhost:5173",
        "http://10.73.53.200:5173"
    ],

    credentials:true
}));

// SESSION

app.use(session({

    secret:process.env.SESSION_SECRET,

    resave:false,

    saveUninitialized:false,

    cookie:{
        secure:false
    }
}));


// STATIC UPLOADS FOLDER

app.use(
    "/uploads",
    express.static("uploads")
);


// API ROUTES

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/cart",
    cartRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);
app.use(
    "/api/wishlist",
    wishlistRoutes
);
app.use(
    "/api/reviews",
    reviewRoutes
);


// DEFAULT ROUTE

app.get("/", (req, res) => {

    res.send(
        "Ecommerce Backend Running"
    );
});


// SERVER

app.listen(
    process.env.PORT,
    "0.0.0.0",
    () => {

        console.log(

            `Server running on port ${process.env.PORT}`
        );
    }
);
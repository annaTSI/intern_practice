const express = require("express");

const router = express.Router();

const {

    addToCart,

    getCart,

    updateCart,

    removeCartItem

} = require("../controllers/cartController");

router.post(
    "/add",
    addToCart
);

router.get(
    "/",
    getCart
);

router.put(
    "/update/:id",
    updateCart
);

router.delete(
    "/remove/:id",
    removeCartItem
);

module.exports = router;
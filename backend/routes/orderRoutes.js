const express = require("express");

const router = express.Router();

const {

    placeOrder,

    getMyOrders,

    getAllOrders,

    updateOrderStatus,

    cancelOrder

} = require("../controllers/orderController");


// USER ROUTES

router.post(
    "/place-order",
    placeOrder
);

router.get(
    "/my-orders",
    getMyOrders
);

router.put(
    "/cancel/:id",
    cancelOrder
);


// ADMIN ROUTES

router.get(
    "/admin/all-orders",
    getAllOrders
);

router.put(
    "/admin/update-status/:id",
    updateOrderStatus
);

module.exports = router;
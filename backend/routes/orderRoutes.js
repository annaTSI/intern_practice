const express = require("express");

const router = express.Router();

const {

    createPayment,

    placeOrder,

    getMyOrders,

    getAllOrders,

    updateOrderStatus,

    cancelOrder,

    downloadInvoice

} = require("../controllers/orderController");


// USER ROUTES
router.post(
    "/create-payment",
    createPayment
);

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
router.get(
    "/invoice/:id",
    downloadInvoice
);
module.exports = router;
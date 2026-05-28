const express = require("express");

const router = express.Router();

const {

    getProducts,

    getSingleProduct,

    addProduct,

    updateProduct,

    deleteProduct

} = require("../controllers/productController");

const adminMiddleware =
require("../middleware/adminMiddleware");

const upload =
require("../middleware/upload");

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.post(
    "/",
    adminMiddleware,
    upload.single("image"),
    addProduct
);

router.put(
    "/:id",
    adminMiddleware,
    upload.single("image"),
    updateProduct
);

router.delete(
    "/:id",
    adminMiddleware,
    deleteProduct
);

module.exports = router;
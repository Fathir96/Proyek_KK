const express = require("express");
const router = express.Router();
const basoController = require("../controller/basoController");
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

router.get("/produk", auth, basoController.tampilData);
router.post("/produk", auth, basoController.createData);
router.put("/produk/:id", auth, basoController.updateData);
router.delete("/produk/:id", auth, basoController.deleteData);
router.get("/produk/:id", basoController.getById);

router.get("/user", userController.tampilUser);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.get("/user/:id", userController.getById);

module.exports = router;

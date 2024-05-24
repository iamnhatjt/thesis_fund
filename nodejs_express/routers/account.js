const express = require("express");
const accountController = require("../controllers/accountController");
const middleware = require("../middleware");
const router = express.Router();

router.get("/all", middleware.checkToken, accountController.getAllAccount);
router.get("/me", middleware.checkToken, accountController.me);
router.post(
  "/changePassword",
  middleware.checkToken,
  accountController.changePassword,
);
router.patch("/update/:id", accountController.updateAccount);
router.delete("/delete/:id", accountController.deleteAccount);
router.get("/:id", accountController.getAccountById);

module.exports = router;

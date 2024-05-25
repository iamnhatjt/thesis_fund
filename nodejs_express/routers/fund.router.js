const express = require("express");
const fundController = require("../controllers/fund.controller");
const middleware = require("../middleware");

const router = express.Router();

router.get("/", middleware.checkToken, fundController.getAllFund);
router.post("/", fundController.createFund);
router.get("/:id", middleware.checkToken, fundController.getDetailFund);
router.patch("/:id", fundController.updateFund);
router.post("/moneyFund/:id", middleware.checkToken, fundController.moneyFund);
router.get(
  "/historyFund/:id",
  middleware.checkToken,
  fundController.historyFund
);

module.exports = router;

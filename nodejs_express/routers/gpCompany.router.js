const express = require("express");
const gpCompanyController = require("../controllers/gpCompany.controller");
const middleware = require("../middleware");
const router = express.Router();

router.post("/", middleware.checkToken, gpCompanyController.createGPCompany);
router.get(
  "/status",
  middleware.checkToken,
  gpCompanyController.getStatusCompany
);

router.patch("/:id", gpCompanyController.patchGpCompany);
router.get("/", middleware.checkToken, gpCompanyController.getAllGpCompany);
router.get("/:id", gpCompanyController.getDetailGPCompany);

module.exports = router;

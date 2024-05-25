const express = require("express");
const docFundController = require("../controllers/docFund.controller");
const router = express.Router();
const multer = require("multer");
const middleware = require("../middleware");
const upload = multer({ dest: "uploads/" });

router.get("/:fundId", middleware.checkToken, docFundController.getAllDocs);
router.post(
  "/:fundId",
  [upload.single("file"), middleware.checkToken],
  docFundController.createDoc
);
router.patch("/:docId", middleware.checkToken, docFundController.updateDoc);

router.get("/data/:docId", docFundController.docFile);
router.delete("/:docId", middleware.checkToken, docFundController.deleteDoc);

module.exports = router;

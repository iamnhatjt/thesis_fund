const express = require("express");
const docController = require("../controllers/doc.controller");
const router = express.Router();
const multer = require("multer");
const middleware = require("../middleware");
const upload = multer({ dest: "uploads/" });

router.get("/:gpId", middleware.checkToken, docController.getAllDocs);
router.post(
  "/:gpId",
  [upload.single("file"), middleware.checkToken],
  docController.createDoc
);
router.patch("/:docId", middleware.checkToken, docController.updateDoc);

router.get("/data/:docId", docController.docFile);
router.delete("/:docId", middleware.checkToken, docController.deleteDoc);

module.exports = router;

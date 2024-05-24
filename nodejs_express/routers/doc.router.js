const express = require("express");
const docController = require("../controllers/doc.controller");
const router = express.Router();
const multer = require("multer");
const middleware = require("../middleware");
const upload = multer({ dest: "uploads/" });

router.get("/:gpId", middleware.checkToken, docController.getAllDocs);
router.post(
  "/:gpId",
  [
    upload.single("file"),

    //   middleware.checkToken
  ],
  docController.createDoc
);

router.get("/data/:docId", docController.docFile);

module.exports = router;

const express = require("express");
const router = express.Router();

const accountRouter = require("./account");
const fundRouter = require("./fund.router");
const authRouter = require("./auth.router");
const gpCompanyRouter = require("./gpCompany.router");
const docRouter = require("./doc.router");

router.use("/account", accountRouter);
router.use("/fund", fundRouter);
router.use("/auth", authRouter);
router.use("/gpCompany", gpCompanyRouter);
router.use("/doc", docRouter);

module.exports = router;

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const router = require("./routers");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./config/swaggerConfig");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

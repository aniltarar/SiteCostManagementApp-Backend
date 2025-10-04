// packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");

// routes import
const authRoute = require("./routes/authRoute.js");
const siteRoute = require("./routes/siteRoute.js");
const costCategoryRoute = require("./routes/costCategoryRoute.js");
const costRoute = require("./routes/costRoute.js");
const userRoute = require("./routes/userRoute.js");

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// config import
const swaggerSpec = require("./config/swagger.config.js");
const connectDatabase = require("./config/databaseConfig");

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Routes
app.use("/auth", authRoute);
app.use("/user",userRoute)
app.use("/site", siteRoute);
app.use("/cost-category", costCategoryRoute);
app.use("/cost", costRoute);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});

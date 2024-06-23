const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors()
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://yaseen-fz2m.vercel.app"); // Or '*' for any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    // Handle preflight requests directly
    if (req.method === "OPTIONS") {
      res.sendStatus(200); // Respond to preflight with success
    } else {
      next(); // Continue to other routes
    }
  });
app.use(express.json());
app.use("/api", router);


const PORT = 8080 || process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

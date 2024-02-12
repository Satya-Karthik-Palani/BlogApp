const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error");

const post = require("./routes/postRoute");
const user = require("./routes/userRoute");

app.use(cors({origin:"https://blogapp-frontend-pa49.onrender.com",credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1", post);
app.use("/api/v1", user);
app.use(errorMiddleware);

module.exports = app;
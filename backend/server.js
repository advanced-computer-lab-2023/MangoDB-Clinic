const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const colors = require("colors");
const mongoose = require("mongoose");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const guestRoutes = require("./routes/guestRoutes");
const connectDB = require("./config/db");
const port = process.env.PORT || 4000;
var path = require("path");
const { selectPatient } = require("./controllers/doctorController");
const cors = require("cors");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use("/", require("./routes/guestRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/patient", require("./routes/patientRoutes"));
app.use("/doctor", require("./routes/doctorRoutes"));

app.use("/payments", require("./middleware/stripeMiddleware"));

app.use("/uploads/", express.static("uploads"));

app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server Started On Port ${port}...`.green.bold)
);

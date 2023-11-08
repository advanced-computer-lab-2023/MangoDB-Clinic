const express = require("express");
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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/doctorHomePage", (req, res) => {
	res.render("doctorHomePage");
});

app.get("/viewAllPatients", (req, res) => {
	res.render("viewAllPatients");
});

app.get("/searchByName", (req, res) => {
	res.render("searchByName", { patients: [] });
});
app.get("/selectedPatient/:id", async (req, res) => {
	try {
		const patientId = req.params.id;
		const patient = await selectPatient(patientId);
		if (!patient) {
			console.error("Patient not found for ID:", patientId);
		}
		res.render("selectedPatient", { patient });
	} catch (error) {
		console.error("Error retrieving patient:", error);

		res.status(500).json({ error: "Error retrieving patient" });
	}
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use("/", require("./routes/guestRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/patient", require("./routes/patientRoutes"));
app.use("/doctor", require("./routes/doctorRoutes"));

app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server Started On Port ${port}...`.green.bold)
);

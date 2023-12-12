const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			"mongodb+srv://omarelzaher:123@mangodb.v1p5zw3.mongodb.net/Main"
			// "mongodb+srv://gabr:zbLk1xeMSClgrciR@cluster0.0iu23i3.mongodb.net/Clinic4"
		);

		console.log(
			`MongoDB Connected Successfuly: ${conn.connection.host}`.magenta.bold
		);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;

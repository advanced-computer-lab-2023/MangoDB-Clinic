const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb+srv://lamawagih:Lxdxjx2002@cluster0.4ib0dfh.mongodb.net/")

        console.log(`MongoDB Connected Successfuly: ${conn.connection.host}`.magenta.bold)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
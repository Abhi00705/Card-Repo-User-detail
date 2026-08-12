const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/testDB1");
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}
connectDB();

const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String
})

const user = mongoose.model("user", userSchema);
module.exports= user;
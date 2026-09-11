import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);
console.log(
    "Mongo host:",
    new URL(process.env.MONGO_URI).hostname
);

connectDB();

const PORT = process.env.PORT || 5000;
console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

const mongoUrl = new URL(process.env.MONGO_URI);

console.log("Mongo host:", mongoUrl.hostname);
console.log("Mongo pathname:", mongoUrl.pathname);
console.log("Mongo search:", mongoUrl.search);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
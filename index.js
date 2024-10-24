const express = require("express");
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose")
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 200, // Limit each IP to 00 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
app.use(express.json())
app.use(cors())
app.use(limiter)

app.use("/auth", require("./routes/authRoutes"))
app.use("/me", require("./routes/userRoutes"))
app.use("/generate", require("./routes/generateRoutes"))


app.get("/", (req, res) => [
	res.send("Hello")
])

app.listen(PORT, () => console.log("Server started at port https://localhost:" + PORT))
mongoose.connect(MONGO_URI, { dbName: "FFCS-Data" });
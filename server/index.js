const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const packageRoutes = require("./routes/package");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const structureRoutes = require("./routes/structure");
const activityRoutes = require("./routes/activity");
const foodRoutes = require("./routes/food");
const orderRoutes = require("./routes/order")
const cookieParser = require("cookie-parser");
const cors = require("cors")


// function for dotenv
dotenv.config();
// function for express
const app = express();

res.header("Access-Control-Allow-Origin", "https://pat-travel.vercel.app");
res.header('Access-Control-Allow-Credentials', true);
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
app.use(session({
key: 'express.sessionID',
name: 'unique',
secret: process.env.SESSION_SECRET,
store: sessionStore,
resave: false,
saveUninitialized: false,
cookie: {
maxAge: 1000 * 60 * 60 * 48,
httpOnly: true,
secure: true,
sameSite: "none",
}
}))
app.use(cors(
    {
        origin:["https://pat-travel.vercel.app"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods:["POST", "GET", "DELETE", "PATCH"],
        credentials: true
    }
))
app.use(express.urlencoded({ extended: true }));
//cookie
app.use(cookieParser())
// to use json method
app.use(express.json());
//PORT
const port = 3000;
// connect to mongoose
mongoose.connect(process.env.KEY_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error", err => {
    console.log(err)
})
mongoose.connection.on("connected", res => {
    console.log("connected")
})
app.use("/api/package", packageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/structure", structureRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

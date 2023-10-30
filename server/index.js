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
app.use(cors(
    {
        origin:["https://pat-travel.vercel.app"],
        methods:["POST", "GET", "DELETE", "PATCH"],
        credentials: true
    }
))
app.use(express.urlencoded({ extended: true }));
//cookie
app.use(cookieParser())
app.get("/imposta-cookie", (req, res) => {
    // Imposta un cookie con l'attributo Secure
    res.cookie("nome_cookie", "valore_cookie", { secure: true, httpOnly: true, maxAge: 3600000 }); // Imposta secure su true
    res.send("Cookie impostato correttamente su connessioni HTTPS.");
  });
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

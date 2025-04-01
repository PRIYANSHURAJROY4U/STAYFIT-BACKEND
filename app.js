const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const emailRoutes = require("./routes/emailRoutes");
const bmiRoutes = require("./routes/bmiRoutes");
const workoutLog = require("./routes/workoutLogRoutes");
const userRoutes = require("./routes/user.route");
const multer = require("multer");

var corsOptions = {
  origin: "http://localhost:8081",
};

// app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const db = require("./model");
db.mongoose // ek sath teeno ko db function me use kr liye dot se
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("hey !!");
});
app.get("/check", (req, res) => {
  res.render("check");
});
const upload = multer({ dest: "uploads/" });

app.use("/api", emailRoutes);
app.use("/api", bmiRoutes);       // for bmi /api/calculate-bmi        aisa krke route hoga 
app.use("/api", workoutLog);   //iske andar teen routes hai /api/workoutLog  and /api/addWorkout   AND /api/customAdd
app.use("/api", userRoutes);     // api/register and api/login        for bothe register and login logic


const PORT = process.env.PORT || 4000;

require("./routes/tutorial.route")(app);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

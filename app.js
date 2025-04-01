const express = require("express");
const cors = require("cors");
const app = express();
const emailRoutes = require("./routes/emailRoutes");
const bmiRoutes = require("./routes/bmiRoutes");
const multer = require("multer");

var corsOptions = {
  origin: "http://localhost:8081",
};

// app.use(cors(corsOptions));
app.use(express.json());
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
app.use("/api", bmiRoutes);


const PORT = process.env.PORT || 4000;

require("./routes/tutorial.route")(app);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// app.get("/", (req, res) => {
//   res.send("hey !!");
// });

const PORT = process.env.PORT || 4000;

require("./routes/tutorial.route")(app);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

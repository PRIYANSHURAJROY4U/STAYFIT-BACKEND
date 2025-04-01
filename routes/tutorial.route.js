module.exports = app => {
  const tutorials = require("../controllers/tut.controller.js");
  // const userdata = require(".//user.route.js")
  const router = require("express").Router();

  router.post("/", tutorials.create);
  router.put("/:id", tutorials.update);
  router.delete("/:id", tutorials.delete);
  router.delete("/", tutorials.deleteAll);
  router.get("/f", tutorials.findAll);
  router.get("/:id", tutorials.findOne);
  router.get("/published", tutorials.findAllPublished);
  // router.get("/check",tutorials.checkpage);
  router.post("/register",tutorials.register);
  router.post("/login",tutorials.login);
// sara route tutorial route localhost/4000/api/tutorials/jo kaam ho
  app.use("/api", router);
};


//  it is new route  for api http://localhost:4000/api/check

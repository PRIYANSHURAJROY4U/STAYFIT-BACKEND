module.exports = app => {
  const tutorials = require("../controllers/tut.controller.js");
  const router = require("express").Router();

  router.post("/", tutorials.create);
  router.put("/:id", tutorials.update);
  router.delete("/:id", tutorials.delete);
  router.delete("/", tutorials.deleteAll);
  router.get("/", tutorials.findAll);
  router.get("/:id", tutorials.findOne);
  router.get("/published", tutorials.findAllPublished);

  app.use("/api/tutorials", router);
};

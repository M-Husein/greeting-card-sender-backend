module.exports = app => {
  const sentEmail = require("../controllers/sent_email.controller.js");
  const router = require("express").Router();

  // Create a new
  router.post("/", sentEmail.create);

  // Retrieve all
  router.get("/", sentEmail.findAll);

  // Delete with id
  router.delete("/:id", sentEmail.delete);

  // Delete all
  router.delete("/", sentEmail.deleteAll);

  app.use('/api/sent-email', router);
};

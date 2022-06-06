const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();


router.post("/", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let registrationData = request.body;
  try {
    await usersLogic.addUser(registrationData);
    response.json();
  } catch (e) {
      return next(e);
  }
});

router.post("/login", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let username = request.body.username;
  let password = request.body.password
  try {
    let userData = await usersLogic.login(username, password);
    response.json(userData);
  } catch (e) {
    return next(e);
  }
});



module.exports = router;

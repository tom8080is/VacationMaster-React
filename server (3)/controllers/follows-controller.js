const followsLogic = require("../logic/follows-logic");
const express = require("express");
const router = express.Router();
const cacheModule = require ('../dao/cache-module')

//add new follows
router.post("/", async (request, response) => {
  try {
    let userData = await cacheModule.extractUserDataFromCache(request);
    let userId= userData.userId;
    let vacationId = request.body.id;
    await followsLogic.followNewVacation(vacationId,userId);
    response.json();

  } catch (e) {
    console.error(e);
    response.status(600).json();
  }
});

// DELETE - remove a follow from a vacation - /api/vacations/follows/:userId/:vacationId
router.delete("/:id", async (request, response) => {
  try {
    let userData = await cacheModule.extractUserDataFromCache(request);
    let userId= userData.userId;
    const vacationId = request.params.id;
    await followsLogic.removeFollow(vacationId,userId);
    response.json();
  } catch (err) {
    response.status(500).send(err.message);
  }
});



module.exports = router;

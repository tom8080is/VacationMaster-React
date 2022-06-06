const vacationLogic = require("../logic/vacations-logic");
const vacationDao = require("../dao/vacations-dao");
const express = require("express");
const router = express.Router();
const cacheModule = require ('../dao/cache-module')

router.get("/", async (request, response) => {
  // Extracting the JSON from the packet's BODY
  try {
    let userData =  await cacheModule.extractUserDataFromCache(request);
    let userId= userData.userId;
    let userType=userData.userType;
    const vacations = await vacationLogic.getAllVacations(userId,userType);
    response.json(vacations);
  } catch (e) {
    console.error(e);
    response.status(600).json();
  }
});
router.post("/", async (request, response, next) => {

  let vacationData = request.body;
  try {
    await vacationLogic.addVacation(vacationData);
    response.json();
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', async (request, response, next) => {
  let vacationId = request.params.id;
  let vacationData = request.body;
  try {
    await vacationLogic.updateVacation(vacationData,vacationId);
    response.json();
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    let vacationId = request.params.id;

    await vacationLogic.deleteVacation(vacationId);
    response.json();
  } catch (e) {
    return next(e);
  }
});


module.exports = router;



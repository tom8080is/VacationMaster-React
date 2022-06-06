const vacationsDao = require("../dao/vacations-dao");
const ServerError = require('../errors/server-error');
const ErrorType  = require('../errors/error-type');

async function addVacation(vacationData) {
  validateVacDetails(vacationData);
  await vacationsDao.addVacation(vacationData);
}

function validateVacDetails(vacationData) {
  if (!vacationData.destination) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.description) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.fromDate) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.toDate) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.price) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.image) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if(vacationData.fromDate>=vacationData.toDate){
    throw new ServerError(ErrorType.INVALID_DATE);
  }
}
async function updateVacation(vacationData,vacationId){
  validateVacDetails(vacationData)
  await vacationsDao.updateVacation(vacationData,vacationId);
}

async function deleteVacation(vacationId){
  await vacationsDao.deleteVacation(vacationId);
  await vacationsDao.deleteAllVacationFollowers(vacationId);
}

async function getAllVacations(userId,userType) {
  let allVacationsArray = await vacationsDao.getAllVacations(userId,userType);
  for(let i=0 ; i<allVacationsArray.length; i++){
    if(allVacationsArray[i].isFollowed==1){
      allVacationsArray[i].isFollowed=true;
    }
    else{
      allVacationsArray[i].isFollowed=false
    }
  }
  return allVacationsArray;
}
module.exports = {
  validateVacDetails,
  addVacation,
  getAllVacations,
  updateVacation,
  deleteVacation
};

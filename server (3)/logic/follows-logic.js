const followsDao = require("../dao/follows-dao");


async function followNewVacation (vacationId,userId) {
  await followsDao.followNewVacation(vacationId,userId);

}
async function removeFollow(vacationId,userId) {
  await followsDao.removeFollow(vacationId,userId);

}

module.exports = {
  followNewVacation,
  removeFollow
};
let connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error')
const ErrorType  = require('../errors/error-type')


// follow a new vacation
async function followNewVacation(vacationId,userId) {
  let sql = `INSERT INTO Follows (vacation_id, user_id)
  VALUES (?,?)`;
  let parameters = [vacationId,userId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}
}

// remove a follow from a vacation
async function removeFollow(vacationId,userId) {
  const sql = `DELETE FROM Follows WHERE vacation_id=? AND user_id =?`;
  let parameters = [vacationId,userId]

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}
}




module.exports = {
  followNewVacation,
  removeFollow,
};

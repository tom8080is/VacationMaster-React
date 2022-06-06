const connection = require("../dao/connection-wrapper");
const ServerError = require('../errors/server-error')
const ErrorType  = require('../errors/error-type')

// get all vacations (ALL USERS)
async function getAllVacations(userId,userType) {
  let sql
  if (userType=='ADMIN'){
    sql = `SELECT 
    v.vacation_id AS id,
    v.destination,
    v.description,
    v.image,
    DATE_FORMAT(v.from_date, "%Y-%m-%d") AS fromDate,
    DATE_FORMAT(v.to_date, "%Y-%m-%d") AS toDate,
    v.price,
    CASE
        WHEN followed.vacation_id IS NOT NULL THEN true
        ELSE false
    END AS 'isFollowed' ,
    CASE
        WHEN fv.followers IS NOT NULL THEN fv.followers
        ELSE 0
    END AS 'amountOfFollowers'
  FROM
    vacations v
        LEFT JOIN
    (SELECT 
        vacation_id
    FROM
        follows
    WHERE
        user_id = ?) followed ON v.vacation_id = followed.vacation_id
        LEFT JOIN
    (SELECT 
        vacation_id, COUNT(vacation_id) AS 'followers'
    FROM
        follows
    GROUP BY vacation_id) fv ON v.vacation_id = fv.vacation_id
    ORDER BY amountOfFollowers DESC`
  }
  else{
    sql = `SELECT 
    v.vacation_id AS id,
    v.destination,
    v.description,
    v.image,
    DATE_FORMAT(v.from_date, "%Y-%m-%d") AS fromDate,
    DATE_FORMAT(v.to_date, "%Y-%m-%d") AS toDate,
    v.price,
    CASE
        WHEN followed.vacation_id IS NOT NULL THEN true
        ELSE false
    END AS 'isFollowed' ,
    CASE
        WHEN fv.followers IS NOT NULL THEN fv.followers
        ELSE 0
    END AS 'amountOfFollowers'
  FROM
    vacations v
        LEFT JOIN
    (SELECT 
        vacation_id
    FROM
        follows
    WHERE
        user_id = ?) followed ON v.vacation_id = followed.vacation_id
        LEFT JOIN
    (SELECT 
        vacation_id, COUNT(vacation_id) AS 'followers'
    FROM
        follows
    GROUP BY vacation_id) fv ON v.vacation_id = fv.vacation_id
    ORDER BY isFollowed DESC`;
    
  }
  
  const parameters = [userId]
  try {
    vacations=await connection.executeWithParameters(sql, parameters);
    return vacations;
  } catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}

}


async function deleteVacation(vacationId) {

  const sql = `DELETE FROM vacations WHERE vacation_id = ? `;
  const parameters = [vacationId]
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}
}

async function deleteAllVacationFollowers(vacationId){
const sql ='DELETE FROM follows WHERE vacation_id = ?'
const parameters = [vacationId]
try {
  await connection.executeWithParameters(sql, parameters);
} catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}
}

async function addVacation(vacationData) {
  let sql = `INSERT INTO vacations ( destination, description, from_date, to_date, price, image)
VALUES (?,?,?,?,?,?);`;

  let parameters = [
    vacationData.destination,
    vacationData.description,
    vacationData.fromDate,
    vacationData.toDate,
    vacationData.price,
    vacationData.image,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}
}

async function updateVacation (vacation,vacationId) {
const sql = 
`UPDATE vacations.vacations set destination = ?
,description = ?
,from_date = ?
,to_date = ?
,price = ?
,image=?
where vacation_id = ?`


  const parameters = [
  vacation.destination,
  vacation.description,
  vacation.fromDate,
  vacation.toDate,
  vacation.price,
  vacation.image,
  vacationId,
 ]             
 try {
  await connection.executeWithParameters(sql, parameters);
} catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}
}



module.exports = {
  getAllVacations,
  addVacation,
  deleteVacation,
  updateVacation,
  deleteAllVacationFollowers,
};

const jwt = require("jsonwebtoken");
let connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error')
const ErrorType  = require('../errors/error-type')

async function cheakIfUsernameAlreadyExist (registrationData){
  let sql = `SELECT * FROM Users WHERE username=? `;
  let parameters = [registrationData.username];

  const userNameResult =  await connection.executeWithParameters(sql, parameters);
  return userNameResult;
}



async function addUser(registrationData) {

   sql = `INSERT INTO Users (first_name, last_name, username,email, password)
          VALUES (?,?,?,?,?);`;


   parameters = [
    registrationData.firstName,
    registrationData.lastName,
    registrationData.username,
    registrationData.email,
    registrationData.password,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}
}

async function login(username, password) {
  let sql = `SELECT username , password ,user_id AS userId ,type AS userType FROM users WHERE username = ? AND password = ? `;

  let parameters = [username, password];
  try {
    let usersLoginResult;
    usersLoginResult = await connection.executeWithParameters(sql, parameters);

    return usersLoginResult[0];
  } catch (e) {throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);}
}


module.exports = {
  addUser,
  login,
  cheakIfUsernameAlreadyExist,

};

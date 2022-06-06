const usersDao = require("../dao/users-dao");
const vacationsDao = require("../dao/vacations-dao");
const jwt = require('jsonwebtoken')
const config = require('../config.json')
const crypto = require('crypto')
const saltRight = 'sdkjfhdskajh';
const saltLeft = 'dsdfsddfgxh';
const cacheModule = require ('../dao/cache-module')
const ServerError = require('../errors/server-error')
const ErrorType  = require('../errors/error-type')


async function addUser(registrationData) {
  
  await validateUserDetails(registrationData);
  registrationData.password = crypto.createHash("md5").update(saltLeft + registrationData.password + saltRight).digest("hex");
  await usersDao.addUser(registrationData);
   
}



async function validateUserDetails(registrationData) {

  const user = await usersDao.cheakIfUsernameAlreadyExist(registrationData);
  if (user.length != 0) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
   }
  if (!registrationData.username) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!registrationData.firstName) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!registrationData.lastName) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!registrationData.password) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if ((registrationData.password.localeCompare(registrationData.confirmPassword))!==0) {
    throw new ServerError(ErrorType.INVALID_PASSWORD);
  }
  if (registrationData.password.length<4) {
    throw new ServerError(ErrorType.INVALID_INPUT);
  }
  if (registrationData.firstName.length<2 ) {
    throw new ServerError(ErrorType.INVALID_NAME);
  }
  if (registrationData.lastName.length<2 ) {
    throw new ServerError(ErrorType.INVALID_NAME);
  }
  if (registrationData.username.length<2 ) {
    throw new ServerError(ErrorType.INVALID_NAME);
  }

}
async function validateLoginDetails(username, password){

  if (!username) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!password) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  
   

}
async function login(username, password) {
  await validateLoginDetails(username, password);
  password = crypto.createHash("md5").update(saltLeft + password + saltRight).digest("hex");
  let userLogin = await usersDao.login(username, password);
  if (!userLogin){
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  let token = jwt.sign({ sub: username }, config.secret);
  cacheModule.set(token, {userType: userLogin.userType, userId: userLogin.userId});

  return { token, userType: userLogin.userType,userName: username };
}

async function getVacation(vacationsData) {
  await vacationsDao.getVacation(vacationsData);
}

module.exports = {
  addUser,
  login,
  getVacation,
};

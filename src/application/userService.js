import repo from '../domain/userRepository';
import User from '../domain/user';

const jsonwebtoken = require('jsonwebtoken');
const config = require('../config/config.json');
const secret = config.development.secret;
var bcrypt = require('bcrypt');
const saltRounds = 10;
var uuidValidate = require('uuid-validate');

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password) {
  return (password.length >= 8);
}


async function returnMe(user) {
  // return await models.User.findById(user.id);
}


async function getAllUsers() {
  return repo.getAll();
}

async function createUser(args) {

  if (!validateEmail(args.email)) {
    throw new Error('USER_EMAIL_INVALID_FORMAT');
  }

  if (!validatePassword(args.password)) {
    throw new Error('USER_PASSWORD_INVALID_TOO_SHORT');
  }

  //encrypt password
  args.password = bcrypt.hashSync(args.password, saltRounds);

  const newUser = await User.create(args);

  // check if user email is existing
  const userEmailExisting = await repo.getBy({ email: args.email });
  if (userEmailExisting) {
    throw new Error('USER_EMAIL_INVALID_EXISTS');
  }

  const usernameExisting = await repo.getBy({ username: args.username });
  if (usernameExisting) {
    throw new Error('USER_USERNAME_INVALID_EXISTS');
  }

  const successUser = await repo.add(newUser);
  if (!successUser) {
    throw new Error('USER_CREATE_ERROR');
  }

  return await repo.getBy({ id: successUser.id });
}

async function updateUser(args) {
  // return  models.User.findAll();
}

async function removeUser(args) {
  if (!uuidValidate(args.id)) {
    throw new Error('USER_ID_INVALID_FORMAT');
  }
  const remove = await repo.remove({ id: args.id });
  return remove;
}

async function getUserById(userID) {


  if (!uuidValidate(userID)) {
    throw new Error('USER_ID_INVALID_FORMAT');
  }

  var user = repo.getBy({ id: userID });
  if (!user) {
    throw new Error('USER_GET_NO_ENTRY_FOUND');
  }

  return user;
}

async function save(args) {

  if (!uuidValidate(args.id)) {
    throw new Error('USER_ID_INVALID_FORMAT');
  }

  if (!validateEmail(args.email)) {
    throw new Error('USER_EMAIL_INVALID_FORMAT');
  }

  if (args.password && !validatePassword(args.password)) {
    throw new Error('USER_PASSWORD_INVALID_TOO_SHORT');
  }

  var checkUserId = await repo.getBy({ id: args.id });
  if (!checkUserId) {
    throw new Error('USER_ID_INVALID_NOT_EXISTING');
  }

  var checkUserEmail = await repo.getBy({ email: args.email, id: { 'ne': args.id } });
  if (checkUserEmail) {
    throw new Error('USER_EMAIL_INVALID_EXISTS');
  }

  if (args.password) {
    var hash = bcrypt.hashSync(args.password, saltRounds);
    args.password = hash;
  }
  else {
    args.password = checkUserId.password;
  }

  const saveUser = User.create(args);

  var result = await repo.update(saveUser);

  if (!result || typeof result != 'object') {
    throw new Error('USER_SAVE_ERROR');
  }
  else {
    return result;
  }
}

async function login(loginData) {
  console.log(secret);
  var checkUser = await repo.getBy({ email: loginData.email });
  if (checkUser) {
    var checkPassword = bcrypt.compareSync(loginData.password, checkUser.password);
    if (!checkPassword) { // wrong password
      throw new Error('USER_LOGIN_WRONG_PASSWORD');
    }
    else { // success

      var loginUserResp = checkUser.getStorageObj();
      const token =
        jsonwebtoken.sign({
          id: loginUserResp.id
        },
          secret,
          { expiresIn: '1d' }
        );
      var loginUserResp = checkUser.getStorageObj();
      loginUserResp.token = token;

      return loginUserResp;
    }
  }
  else { // no matching user found
    throw new Error('USER_LOGIN_WRONG_EMAIL');
  }
}

export default {
  returnMe,
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  removeUser,
  save,
  login
}

import repo from '../domain/userRepository';
import User from '../domain/user';
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

async function getUserById(id) {
  // TODO  see how to deal with cannot return null for non nullable 
  // return await models.User.findById(id);
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
  const remove =await repo.remove({ id: args.id }); 
  return remove;
}



export default {
  returnMe,
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  removeUser
}

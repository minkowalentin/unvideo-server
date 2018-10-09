import fakeDb from '../fakeDb';
const users = fakeDb.users; 

function returnMe(user) {
  return user;
}

function getUserBy(args) {
  // TODO  see how to deal with cannot return null for non nullable 
  let returnUser = {};
  users.forEach(user => {
    if (user.id === args.id) {
      returnUser = user;
    }
  });
  return returnUser
}

function getAllUsers() {
  return Object.values(fakeDb.users);
}


export default {
  returnMe, 
  getUserBy,
  getAllUsers,
}

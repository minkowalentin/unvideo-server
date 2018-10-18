

async function returnMe(models, user) {
  return await models.User.findById(user.id);
}

async function getUserBy(id, models) {
  // TODO  see how to deal with cannot return null for non nullable 
  return await models.User.findById(id);
}

async function getAllUsers(models) {
  return await models.User.findAll();
}


export default {
  returnMe, 
  getUserBy,
  getAllUsers,
}

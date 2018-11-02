import { userDbModel } from './index';

async function addUser(newUserStorageObj) {
    var createdUser = userDbModel.create(newUserStorageObj);
    return createdUser;
}

async function updateUser(saveUserStorageObj) {
    var result = await userDbModel.update(saveUserStorageObj, {
         where: { id: saveUserStorageObj.id }})
        .then(function(result) {
            if (result[0]) {
                return true;
            }
            return false;
        })
        .catch(function(err) {
            if (err.errors && err.errors[0]) {
                return err.errors[0].message;
            }
            return false;
        });

    return result;
}

async function getAllUsers() {
    var users = userDbModel.findAll({
      });
    return users;
}

async function getUserBy(byObj) {
    var user = userDbModel.findOne({
      where: byObj 
    });
    return user;
}

export default {
    User: {
        add: addUser,
        update: updateUser,
        getBy: getUserBy,
        getAll: getAllUsers,
    }, 
};
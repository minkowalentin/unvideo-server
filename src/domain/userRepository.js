import User from './user';
import user from '../infrastructure/storage/userStorage';
const userModel = user.User;

async function add(newUser) {
    await userModel.add(newUser.getStorageObj());
    return newUser;
}

async function getBy(args) {
    const storedUser = await userModel.getBy(args);

    if (storedUser) {
        var newUser = User.createFromStorage(storedUser);
        return newUser;
    }
    else {
        return false;
    }
}

async function getAll() {
    const allStoredUsers = await userModel.getAll();
    return allStoredUsers.map((storedUser) => User.createFromStorage(storedUser));
}

async function remove(args) {
    const removeUser = await userModel.getBy(args);
    if (!removeUser) {
        throw new Error('USER_DELETE_NO_ENTRY_FOUND');
    }
    removeUser.destroy();
    return true;
}

export default {
    add,
    remove,
    getBy,
    getAll
}
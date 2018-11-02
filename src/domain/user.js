import uuidv1 from 'uuid/v1';

// create user

function create({ id = uuidv1(), username, email, password}) {
    return Object.freeze({
        id,
        email,
        username,
        password,

        getStorageObj: () => {
            return {
                id,
                email,
                username,
                password,
            };
        }
    });
    
}

function createFromStorage({ id, username, email, password}) {
    return create({
        id,
        email,
        username,
        password,
    });
}
export default {
    create,
    createFromStorage
}
import userService from '../../../application/userService';

/**
 * Export the graphQl user resolver
 */
export default {
    Query: {
        me: (parent, args, {models, user}) => userService.returnMe(models,user),
        getUserById: (parent, {id}, {models}) => userService.getUserBy(id,models),
        getAllUsers: (parent, args, {models}) => userService.getAllUsers(models),
    }
};


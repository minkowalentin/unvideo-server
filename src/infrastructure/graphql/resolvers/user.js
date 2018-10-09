import userService from '../../application/userService';

/**
 * Export the graphQl user resolver
 */
export default {
    Query: {
        me: (parent, args, {user}) => userService.returnMe(user),
        getUserById: (parent, {id}, context) => userService.getUserBy(id),
        getAllUsers: (parent, args, context) => userService.getAllUsers(),
    }
};


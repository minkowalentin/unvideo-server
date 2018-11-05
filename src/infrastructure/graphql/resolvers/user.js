import userService from '../../../application/userService';

/**
 * Export the graphQl user resolver
 */
export default {
    Query: {
        me: (parent, args, { user }) => userService.returnMe(user),
        getUserById: (parent, { id }, context) => userService.getUserById(id),
        getAllUsers: (parent, args, context) => userService.getAllUsers(),
        loginUser: (parent, args, context) => userService.login(args)

    },

    Mutation: {
        createUser: (parent, args, context) => userService.createUser(args),
        updateUser: (parent, args, context) => userService.save(args),
        removeUser: (parent, args, context) => userService.removeUser(args),
    }
};


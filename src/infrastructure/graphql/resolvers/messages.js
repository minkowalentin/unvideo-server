import messageService from '../../application/messageService';

/**
 * Export the graphQl user resolver
 */
export default {
    Query: {
      getAllMessages: (parent, args, context) => messageService.getAll(),
      getMessageById: (parent, {id}, context) => messageService.getById(id),
      getMessagesByUserId: (parent, {id}, context) => messageService.getUserMessages(id),
    },

    Mutation: {
      createMessage: (parent, {content}, {user}) => messageService.createMessage(content, user),
      deleteMessage: (parent, {id}, context) => messageService.deleteMessage(id)
    }
};


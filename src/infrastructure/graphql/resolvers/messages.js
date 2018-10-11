import messageService from '../../application/messageService';

/**
 * Export the graphQl user resolver
 */
export default {
    Query: {
      getAllMessages: (parent, args, {models}) => messageService.getAll(models),
      getMessageById: (parent, {id}, {models}) => messageService.getById(id, models),
      getMessagesByUserId: (parent, {id}, {models}) => messageService.getUserMessages(id, models),
    },

    Mutation: {
      createMessage: (parent, {content}, {models,user}) => messageService.createMessage(content, models, user),
      deleteMessage: (parent, {id}, {models}) => messageService.deleteMessage(id, models)
    }
};


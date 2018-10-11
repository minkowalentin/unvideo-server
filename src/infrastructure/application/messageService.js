import uuidv4 from 'uuid/v4';

async function getAll(models) {
  return await models.Message.findAll();
}

async function getById(id, models) {
  return await models.Message.findById(id);
}

async function getUserMessages(id, models) {
  // to do fix
  return await models.Message.findById(id)
}

async function createMessage(content, models, user) {
  return await models.Message.create({
    content,
    userId: user.id
  });
}

async function deleteMessage(id, models) {
  return await models.Message.destroy({where: {id}});
}

export default {
  getAll,
  getById,
  getUserMessages,
  createMessage,
  deleteMessage
}

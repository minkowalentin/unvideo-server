import fakeDb from '../fakeDb';
import uuidv4 from 'uuid/v4';

const messages = fakeDb.messages;

function getAll() {
  return Object.values(fakeDb.messages);
}

function getById(id) {
  let returnMessage = {};
  messages.forEach(message => {
    if (id === message.id) {
      returnMessage = message;
    }
  });

  return returnMessage;
}

function getUserMessages(id) {
  const messagesWithUserId = [];
  messages.forEach(message => {
    if (message.user.id === id) {
      messagesWithUserId.push(message);
    }
  });

  return Object.values(messagesWithUserId);
} 

function createMessage(content, user) {
  const id = uuidv4();
  const newMessage = {
    id,
    content,
    user
  };
  fakeDb.addToMessages(newMessage);
  return newMessage
}

function deleteMessage(id) {
  let index = -1;
   messages.forEach((message, i) => {
    if (message.id === id ) {
       index = i;
    }
  });

  if (index !== -1) {
    fakeDb.deleteMessage(index);
    return true;
  } else {
    return false;
  }
}

export default {
  getAll,
  getById,
  getUserMessages,
  createMessage,
  deleteMessage
}

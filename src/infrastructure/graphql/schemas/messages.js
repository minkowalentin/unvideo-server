export default `
type Query {
  getAllMessages: [Message]
  getMessageById(id: ID!): Message
  getMessagesByUserId(id: ID!): [Message]
}

type Mutation {
  createMessage(content: String!): Message! 
  deleteMessage(id: ID!): Boolean!
}
type Message {
  id: ID!
  content: String!
  user: User!
}
`;
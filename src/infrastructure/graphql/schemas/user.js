export default `
type Query {
  me: User!
  getUserById(id: ID!): User!
  getAllUsers: [User!],
  loginUser(email: String!, password: String!): User!
}

type Mutation {
  createUser(email: String!, username: String!, password: String!): User!
  updateUser(id: String!, username: String, email: String, password: String): User!
  removeUser(id: String!): Boolean!
}

type User {
  id: ID!
  token: String
  username: String!
  email: String!
  password: String!
}
`;
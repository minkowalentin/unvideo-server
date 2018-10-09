export default `
type Query {
  me: User
  getUserById(id: ID!): User
  getAllUsers: [User!]
}

type User {
  id: ID!
  username: String!
}
`;
import 'dotenv/config';
import path from 'path';
import {
  fileLoader,
  mergeTypes,
  mergeResolvers
} from 'merge-graphql-schemas';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { sequelize } from './infrastructure/storage/index'

const me =  {
  id: '2',
  username: 'Dave Davids',
};

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './infrastructure/graphql/schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './infrastructure/graphql/resolvers')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    user: me
  }
});

const app = express();

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

sequelize.sync().then(async () => {
  sequelize.authenticate()
  .then(()=>{console.log('Connected to database')})
  .catch(err => {console.log('Unable to connect to database ',err);});

  app.listen({ port: process.env.localPort }, () => {
    console.log('Server running on port ' + process.env.localPort);
  })
})


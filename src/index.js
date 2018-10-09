import 'dotenv/config';

import fakeDb from './infrastructure/fakeDb'
import path from 'path';
import {
  fileLoader,
  mergeTypes,
  mergeResolvers
} from 'merge-graphql-schemas';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';


const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './infrastructure/graphql/schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './infrastructure/graphql/resolvers')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    fakeDb,
    user: fakeDb.me
  }
});

const app = express();

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.localPort}, () => {
  console.log('Server running on port ' + process.env.localPort);
})


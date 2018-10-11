import 'dotenv/config';

import fakeSeeds from './infrastructure/fakeSeeds';
import path from 'path';
import {
  fileLoader,
  mergeTypes,
  mergeResolvers
} from 'merge-graphql-schemas';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import models, { sequelize } from './infrastructure/models'

const me =  {
  id: '2',
  username: 'Dave Davids',
};

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './infrastructure/graphql/schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './infrastructure/graphql/resolvers')));
const eraseDatabaseOnSync = true;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    user: me
  }
});

const app = express();

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

sequelize.sync({force: eraseDatabaseOnSync}).then(async () => {
  sequelize.authenticate()
  .then(()=>{console.log('Connected to database')})
  .catch(err => {console.log('Unable to connect to database ',err);});

  if (eraseDatabaseOnSync){
    fakeSeeds.createUsers();
  }

  app.listen({ port: process.env.localPort }, () => {
    console.log('Server running on port ' + process.env.localPort);

    

  })
})

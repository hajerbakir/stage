import Sequelize from 'sequelize';
const {DataTypes , Op} = Sequelize;
import bcrypt from 'bcrypt';
import { REAL } from 'sequelize';
const sequelize = new Sequelize('stage','root','',{
    dialect:'mysql'
});


//test of connection
/*
sequelize.authenticate().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log("error connecting to database");
});
*/

import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

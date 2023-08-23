
import { gql } from 'apollo-server';

import { GraphQLScalarType, Kind } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { parseISO, format } from 'date-fns';
//const { sequelize, User, Salle, Reservation } = require('/models');

const typeDefs = gql`scalar Date
type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    isAdmin:Boolean!
    image: String!
  }
  
  type Salle {
    id: ID!
    etage:Int!
    num_salle:Int!
    nbr_chaises:Int!
    acces_handicape:Boolean!
    micro:Boolean!
    video_projecteur:Boolean!
    sound_proof:Boolean!
    climatiseur:Boolean!
    image:String!
  }
  
  type Reservation {
    id: ID!
    date_heure: Date!
    etat:Boolean!
    user: User!
    salle: Salle!
  }
  
  type Query {
    getUser(id: ID!): User
    getUsers : [User]
    getSalle(id: ID!): Salle
    getSalles : [Salle]
    getReservation(id: ID!): Reservation
    getReservations : [Reservation]
  }

input CreateUserInput{
  username: String! , password: String! , email: String! , isAdmin:Boolean! , image: String!
}
input UpdateUserInput{
 id:ID!, username: String , password: String , email: String  , image: String
}
input CreateSalleInput{
        etage:Int! ,
        num_salle:Int!,
        nbr_chaises:Int!,
        acces_handicape:Boolean!,
        micro:Boolean!,
        video_projecteur:Boolean!,
        sound_proof:Boolean!,
        climatiseur:Boolean!,
        image:String!
}
input UpdateSalleInput{
  id:ID!
  etage:Int ,
  num_salle:Int,
  nbr_chaises:Int,
  acces_handicape:Boolean,
  micro:Boolean,
  video_projecteur:Boolean,
  sound_proof:Boolean,
  climatiseur:Boolean,
  image:String
}
input CreateReservationInput{
  userId: ID!,salleId: ID!, date_heure:Date! , etat:Boolean!
}
input UpdateReservationInput{
  id: ID!,salleId: ID, date_heure:Date , etat:Boolean,
}
  
  type Mutation {
    createUser(data:CreateUserInput): User
    createSalle(data: CreateSalleInput): Salle
    createReservation(data: CreateReservationInput): Reservation
    deleteUser(id:ID!): User
    restoreUser(id:ID!): User
    deleteSalle(id:ID!): Salle
    deleteReservation(id:ID!):Reservation
    updateUser(data:UpdateUserInput):User
    updateSalle(data:UpdateSalleInput):Salle
    updateReservation(data:UpdateReservationInput):Reservation
  }
  
  `;
  export default typeDefs;
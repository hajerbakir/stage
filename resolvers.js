// const User = require('./models/user');
import * as helpers from './helpers.js';
import  User from "./models/user.js";
import  Salle from "./models/salle.js";
import  Reservation from "./models/reservation.js";


const resolvers = {
  Query: {
    getUser:(_, args) => { return helpers.getUser(args)  },
    getUsers:(parent) => { return helpers.getUsers()},
    getSalle: (_, args) => { return helpers.getSalle(args)  },
    getSalles:(parent) => { return helpers.getSalles()},
    getReservation: (_, args) => { return helpers.getReservation(args)  },
    getReservations:(parent) => { return helpers.getReservations()},
  },
  Mutation: {
    createUser: (_,args) => {
      console.log(args)
      const createUserInput = args.data
          const newUser = helpers.createUser(createUserInput);
           return newUser;
      },

      createSalle: (_,args) => {
        const createSalleInput = args.data
            const newSalle = helpers.createSalle(createSalleInput);
             return newSalle;
        },

    createReservation: (_,args) => {
      const createReservationInput = args.data
          const newReservation = helpers.createReservation(createReservationInput);
      return newReservation;
    },
    deleteUser: (_,args) => {
          const newUser = helpers.deleteUser(args);
           return newUser;
      },
    restoreUser: (_,args) => {
        const newUser = helpers.restoreUser(args);
         return newUser;
    },
    deleteSalle: (_,args) => {
      const newSalle = helpers.deleteSalle(args);
       return newSalle;
  },
    deleteReservation: (_,args) => {
    const newReservation = helpers.deleteReservation(args);
     return newReservation;
  },
  updateUser: (_,args) => {
    const updateUserInput = args.data
    const newUser = helpers.updateUser(updateUserInput );
     return newUser;
  },
  updateSalle: (_,args) => {
    const updateSalleInput = args.data
    const newSalle = helpers.updateSalle(updateSalleInput );
     return newSalle;
  },
  updateReservation: (_,args) => {
    const updateReservationInput = args.data
    const newReservation = helpers.updateReservation(updateReservationInput );
     return newReservation;
  },

  },
  Reservation: {
    user: reservation => User.findOne({where: { id : reservation.userId}}),
    salle: reservation => Salle.findOne({where: {id : reservation.salleId}}),
  },
};
export default resolvers;
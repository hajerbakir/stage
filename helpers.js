import  User from "./models/user.js";
import  Salle from "./models/salle.js";
import  Reservation from "./models/reservation.js";
import Sequelize from 'sequelize';
const { Op} = Sequelize;


 export async function getUser(args) {
  try {
    const test = await User.findByPk(args.id  );
    if (!test) {
      throw new Error('User not found');
    }    
    return test;
  } catch (error) {
    throw new Error('Error : ' + error.message);
  }
  }

  export async function getUsers() {
    const test = await User.findAll();
    return test;
  }

  export async function getSalle(args) {
    try{
      const test = await Salle.findByPk(args.id  );
    if (!test) {
      throw new Error('Salle not found');
    }    
    return test;
  } catch (error) {
    throw new Error('Error : ' + error.message);
  }
}

  export async function getSalles() {
    const test = await Salle.findAll();
    return test;
  }

  export async function getReservation(args) {
    try{
      const test = await Reservation.findByPk(args.id  );
    if (!test) {
      throw new Error('Reservation not found');
    }    
    return test;
  } catch (error) {
    throw new Error('Error : ' + error.message);
  }
}

  export async function getReservations() {
    const test = await Reservation.findAll();
    return test;
  }


  export async function createUser(createUserInput) {
    try{
      const newUser = await User.create({
      username: createUserInput.username,
      password : createUserInput.password,
      email : createUserInput.email,
      isAdmin : createUserInput.isAdmin,
      image : createUserInput.image
    });
    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}
  export async function createSalle(createSalleInput) {
    try{
      const newSalle = await Salle.create({
      etage: createSalleInput.etage,
      num_salle: createSalleInput.num_salle,
      nbr_chaises: createSalleInput.nbr_chaises,
      acces_handicape: createSalleInput.acces_handicape,
      micro: createSalleInput.micro,
      video_projecteur: createSalleInput.video_projecteur,
      sound_proof: createSalleInput.sound_proof,
      climatiseur: createSalleInput.climatiseur,
      image: createSalleInput.image
    });
    return newSalle;
  } catch (error) {
    throw new Error('Error creating salle: ' + error.message);
  }
}

export async function createReservation(createReservationInput) {

  try{
    const user =  User.findOne({where: { id : createReservationInput.userId}});
    if (!user) {
      throw new Error('user not found');
    }

  console.log({here : createReservationInput.salleId})

    const salle =  Salle.findOne({where: { id : createReservationInput.salleId}});
    if (!salle) {
      throw new Error('salle not found');
    }


    const newReservation = await Reservation.create({
    userId: createReservationInput.userId,
    salleId: createReservationInput.salleId,
    etat: createReservationInput.etat,
    date_heure: createReservationInput.date_heure
  });
  return newReservation;

} catch (error) {
  throw new Error('Error creating Reservation: ' + error.message);
}
}

export async function deleteUser(args) {
  try{const test = await User.findByPk(args.id);
    if (!test) {
      throw new Error('user not found');
    }
  const currentDate = new Date();
 
 User.destroy({where: {id: args.id} 
}).then(()=>{

 return Reservation.destroy({
   where: {
     [Op.and]: [
       { userId: args.id},
       { date_heure: { [Op.gte]: currentDate } }
     ]
   }})});
   return test;
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
}

export async function restoreUser(args) {
  try{const test = await User.findByPk(args.id);
    if (test) {
      throw new Error('user already restored');
    }
    const newUser= User.restore({where:{id:args.id}});
    return  await User.findByPk(args.id)
  } catch (error) {
    throw new Error('Error restoring user: ' + error.message);
  }
  }

  export async function deleteSalle(args) {
    try{const test = await Salle.findByPk(args.id);
      if (!test) {
        throw new Error('salle not found');
      }
   Salle.destroy({where: {id: args.id} });
     return test;
    } catch (error) {
      throw new Error('Error deleting salle: ' + error.message);
    }
  }

  export async function deleteReservation(args) {
    try{const test = await Reservation.findByPk(args.id);
      if (!test) {
        throw new Error('reservation not found');
      }
      Reservation.destroy({where: {id: args.id} });
     return test;
    } catch (error) {
      throw new Error('Error deleting reservation: ' + error.message);
    }
  }

  export async function updateUser(args) {
    try {
      const user = await User.findByPk(args.id);
      if (!user) {
        throw new Error('user not found');
      }
  
      if (args.username) {
        user.username = args.username;
      }
      if (args.password) {
        user.password = args.password;
      }
      if (args.email) {
        user.email = args.email;
      }
      if (args.image) {
        user.image = args.image;
      }
      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }
  export async function updateSalle(args) {
    try {
      const salle = await Salle.findByPk(args.id);
      if (!salle) {
        throw new Error('salle not found');
      }
      if (args.etage ) {
        salle.etage = args.etage;
      }
      if (args.num_salle) {
        salle.num_salle = args.num_salle;
      }
      if (args.nbr_chaises ) {
        salle.nbr_chaises = args.nbr_chaises;
      }
      
      if (args.acces_handicape ) {
        salle.acces_handicape = args.acces_handicape;
      }
      else salle.acces_handicape=salle.acces_handicape;
      if (args.micro) {
        salle.micro = args.micro;
      }
      if (args.video_projecteur ) {
        salle.video_projecteur = args.video_projecteur;
      }
      if (args.sound_proof) {
        salle.sound_proof = args.sound_proof;
      }
      if (args.climatiseur ) {
        salle.climatiseur = args.climatiseur;
      }
      if (args.image) {
        salle.image = args.image;
      }
  
      const updatedSalle = await salle.save();
      return updatedSalle;
    } catch (error) {
      throw new Error('Error updating salle: ' + error.message);
    }
  }
  
  export async function updateReservation(args) {
    try {
      const reservation = await Reservation.findByPk(args.id);
      if (!reservation) {
        throw new Error('reservation not found');
      }
  
      if (args.salleId) {
        const salle = await Salle.findByPk(args.salleId);
        if (!salle) {
          throw new Error('salle not found');
        }
        else
        reservation.salleId = args.salleId;
      }
      if (args.date_heure) {
        reservation.date_heure = args.date_heure;
      }
      if (args.etat ) {
        reservation.etat = args.etat;
      }
      const updatedReservation = await reservation.save();
      return updatedReservation;
    } catch (error) {
      throw new Error('Error updating reservation: ' + error.message);
    }
  }
  
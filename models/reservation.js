import Sequelize, { DataTypes as _DataTypes } from 'sequelize';
const {DataTypes , Op} = Sequelize;
import { hashSync, genSaltSync } from 'bcrypt';
import { REAL } from 'sequelize';
const sequelize = new Sequelize('stage','root','',{
    dialect:'mysql'
});

import  User from "./user.js";
import  Salle from "./salle.js";

const Reservation= sequelize.define('reservation',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement:true
    },
    date_heure:{
        type : Sequelize.DataTypes.DATE,
        validate:{
            isAfterNow: function(value) {
                if (new Date(value) <= new Date()) {
                  throw new Error('the date must be after the current date.');
                }
            },
   
      //  allowNull: false,
}
    },
    etat:{
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue:false
    }
    
},
{
    timestamps: false,
    
    
    
});
/////etat becomes false when date is old //TODO
/*Reservation.addHook('beforeSave',(reservation)=> {
    if (reservation.date_heure < new Date()) {
      reservation.etat = false;
      console.log("test1");
    }
    //else console.log("test2");
    });
    */


User.belongsToMany(Salle, {through: Reservation, onDelete: 'SET NULL'});
Salle.belongsToMany(User, {through: Reservation, onDelete: 'CASCADE'});

export default Reservation;
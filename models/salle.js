import Sequelize, { DataTypes as _DataTypes } from 'sequelize';
const {DataTypes , Op} = Sequelize;
import { hashSync, genSaltSync } from 'bcrypt';
import { REAL } from 'sequelize';
const sequelize = new Sequelize('stage','root','',{
    dialect:'mysql'
});


const Salle= sequelize.define('salle',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement:true
    },
    etage:{
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    num_salle:{
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    nbr_chaises:{
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    acces_handicape:{
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue:false
    },
    micro:{
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue:false
    },
    video_projecteur:{
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue:false
    },
    sound_proof:{
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue:false
    },
    climatiseur:{
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue:false
    },
    image:{
        type : Sequelize.DataTypes.STRING,
        defaultValue:null,
        get(){
            return  this.getDataValue('image');
        }
    }
    
},
{
    freezeTableName :true,
    timestamps: false
});

export default Salle;
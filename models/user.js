import Sequelize, { DataTypes as _DataTypes } from 'sequelize';
const {DataTypes , Op} = Sequelize;
import { hashSync, genSaltSync } from 'bcrypt';
import { REAL } from 'sequelize';
const sequelize = new Sequelize('stage','root','',{
    dialect:'mysql'
});


const User= sequelize.define('user',{
    id:{
        type: _DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement:true,
        get(){
            return  this.getDataValue('id');
        },
    },
    username:{
        type : _DataTypes.STRING,
        allowNull: false,
        get(){
            return  this.getDataValue('username');
        },
        
    },
   
    password:{
        type : _DataTypes.STRING,
        allowNull: false
    },
    email:{
        type : _DataTypes.STRING,
        allowNull: false,
        //unique:true, // TODO
        validate:{
        isEmail:true
        },
        get(){
            return  this.getDataValue('email');
        },
    
    },
    isAdmin:{
        type : _DataTypes.BOOLEAN,
        defaultValue:false,
        get(){
            return  this.getDataValue('isAdmin');
        }
    },
    image:{
        type : _DataTypes.STRING,
        defaultValue:null,
        get(){
            return  this.getDataValue('image');
        }
    }
},
{
    freezeTableName :true,
    timestamps: true,
    validate:{
        usernamePassMatch(){
            if(this.username === this.password){
            throw new Error ("password cannot be your username");
            
         }else {
            this.password=hashSync('password',genSaltSync(12));
         }
         }
    },
    paranoid:true,
});
export default User;
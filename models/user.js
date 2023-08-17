const User= sequelize.define('user',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement:true
    },
    username:{
        type : Sequelize.DataTypes.STRING,
        allowNull: false,
        get(){
            return  this.getDataValue('username');
        },
        
    },
   
    password:{
        type : Sequelize.DataTypes.STRING,
        allowNull: false
    },
    email:{
        type : Sequelize.DataTypes.STRING,
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
        type : Sequelize.DataTypes.BOOLEAN,
        defaultValue:false,
        get(){
            return  this.getDataValue('isAdmin');
        }
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
    timestamps: true,
    validate:{
        usernamePassMatch(){
            if(this.username === this.password){
            throw new Error ("password cannot be your username");
            
         }else {
            this.password=bcrypt.hashSync('password',bcrypt.genSaltSync(12));
         }
         }
    },
    paranoid:true,
});

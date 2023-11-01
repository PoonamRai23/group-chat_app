const sequelize=require('sequelize')
const Sequelize=require('../util/chatAPP')
const user=Sequelize.define('user',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    name:{
       type:sequelize.STRING,
    },
    email:{
        type:sequelize.STRING,
        allowNull:false,
         unique:true
    },
    password:{
        type:sequelize.STRING,
        allowNull:false

    },
    number:{
        type:sequelize.INTEGER,
        allowNull:false
   
},
status:{
    type:sequelize.STRING,
    defaultValue:"offline"
}



})
module.exports=user
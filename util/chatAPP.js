const  sequelize=require('sequelize')
const Sequelize=new sequelize('chatapp','root','poonam@23',{
    dialect:"mysql",
    host:'localhost'
})

Sequelize.authenticate()
.then(()=>{
    console.log('connected  database successfully')
})
.catch((error)=>{
    console.log('failed to connect database',error)
})

module.exports=Sequelize
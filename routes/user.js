const express=require('express')
const router=express.Router()
const path=require('path')
const cors=require('cors')
const user=require('../models/user')
const bcrypt=require('bcrypt')
const expenseController=require('../controller/user')
const middleware=require('../middleware/auth')
const jwt=require('jsonwebtoken')
router.use(cors())
const bodyparser=require('body-parser')

router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json())
 router.use(express.static(path.join(__dirname,'views')))



router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','signup.html'))
    console.log("hhiii")
})

router.post('/sign-up',expenseController.createSignupController)

router.post('/login',expenseController.createloginController)
router.get("/user",expenseController.getLoginUsers)
router.put('/updateStatus/:id',expenseController.updateUsers)
module.exports=router
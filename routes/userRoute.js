const express = require('express');
const router = express.Router();

const {registration,login} = require('../controllers/users');

router.get("/",(req,res)=>{
    res.render("user");
})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/welcome/:id",(req,res)=>{
    let email = req.params.id;
    res.render("welcome",{email:email});
})

router.get("/register",(req,res)=>{
    res.render("register");
})

router.post('/create_acc',registration);
router.post('/acc_login',login);

module.exports = router;
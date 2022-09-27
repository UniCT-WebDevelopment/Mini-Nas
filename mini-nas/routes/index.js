const express = require('express');
let router = express.Router();
const session= require("express-session");
const login=require("../my_modules/login_json/login");

router.use(session({
  secret: "efvjjnvdfobj",saveUninitialized:true,resave:true}
));

let err=null;

router.get('/',(req,res,next)=>{
  let s=req.session;
  if(s.type=='admin'){  return res.redirect('/admin');}
  else if(s.type=='user'){  return res.redirect('/users')}
  else{
    res.redirect('/login');
  }
})

router.post('/',(req,res,next)=>{
  let user=req.body.usr;
  let passw=req.body.pass;
  login.verify(user,passw,(v,typeU)=>{
    if(v){
      console.log(typeU)
      req.session.type=typeU;
      if(typeU=='client'){req.session.user=user}
      ;
      return res.redirect(`/${typeU}`)
    }
    else{
      res.redirect('/');
     return err="Username or Password invalid "
   }
  })
})
router.get('/login',(req,res,next)=>{
  if(req.session.type) {
    delete req.session.type;
    if(req.session.user){delete req.session.user };
  }
  res.render('login',{error:err})
  return err=null;
})


module.exports = router;

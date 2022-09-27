const express = require('express');
const login=require('../my_modules/login_json/login')
const sys =require('../my_modules/system_info/system.js')
const storage= require('../my_modules/storage/storage.js')
let router = express.Router();

router.get('/',(req,res,next)=>{
  if (req.session.type=='admin'){
    return res.render('admin_dash');
  }
  else{
    return res.redirect('/');
  }
})

router.get('/account',(req,res,next)=>{
  if (req.session.type=='admin'){
    return login.list((row)=>{res.end(JSON.stringify({"Account":row}))});
  }
  else{
    return res.redirect('/');
  }
})

router.get('/setting',(req,res,next)=>{
  if (req.session.type=='admin'){
    return res.redirect('/plugin');
  }
  else{
    return res.redirect('/');
  }
})

router.get('/storage',(req,res,next)=>{
  if (req.session.type=='admin'){
    return res.end(JSON.stringify(storage.listDisk()));
  }
  else{
    return res.redirect('/');
  }
})

router.post('/storage',(req,res,next)=>{
  if (req.session.type=='admin'){
    
    return res.redirect('/'); 
  }
  else{
    return res.redirect('/');
  }
})

router.post('/storage/change',(req,res,next)=>{
  if(req.session.type=='admin'){
    console.log(req.body);
    return res.end(JSON.stringify({status:'done'}));
  }
  else {return res.end(JSON.stringify({status:'error'}))}
})

router.get('/system',(req,res,next)=>{
  if (req.session.type=='admin'){
    return res.end(JSON.stringify(sys));
  }
  else{
    return res.redirect('/');
  }
})

module.exports =router;

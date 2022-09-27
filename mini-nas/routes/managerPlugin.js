const express = require('express');
var router = express.Router();
const linuxBase=require('../my_modules/plugin/plugin.js');
const login=require("../my_modules/login_json/login");
const storage = require('../my_modules/storage/storage.js');
const { CreatePartition } = require('../my_modules/storage/storage.js');

router.get('/', function(req, res, next) {
  if (req.session.type=="admin"){
    return linuxBase.storageAdmin(((store)=>{
      store=Object.assign({"label":"Storage"},store)
        linuxBase.AccountClient((client)=>{
          client=Object.assign({"label":"Client"},client)
          let temp=new Object;
          temp.list=[];
          temp.list.push(store);
          temp.list.push(client);
          return res.end(JSON.stringify(temp));
        })
  
    }))
  }
  else {return res.redirect('/')}
});

router.get('/storageAdminActive', function(req, res, next) {
  if (req.session.type=="admin"){
    return linuxBase.storageAdminActive((row)=>{res.end(JSON.stringify(row))})
  }
  else {return res.redirect('/')}
});

router.get('/Admin', function(req, res, next) {
  if (req.session.type=="admin"){
    return linuxBase.storageAdmin((row)=>{ res.end(JSON.stringify(row))})}
  else {return res.redirect('/')}
});

router.get('/admin/clientActive', function(req, res, next) {
  if (req.session.type=="admin"){
    return linuxBase.AccountClientActive((row)=>{res.end(JSON.stringify(row))})
  }
  else {return res.redirect('/')}
});

router.get('/admin/client', function(req, res, next) {
  if (req.session.type=="admin"){
    return linuxBase.AccountClient((row)=>{ res.end(JSON.stringify(row))})}
  else {return res.redirect('/')}
});

router.post('/changeStatus', function(req, res, next) {
  if (req.session.type=="admin"){
    return linuxBase.changeStatus(req.body.table,req.body.id,(state)=>{res.end(JSON.stringify({Status:state}))})
  }
  else {return res.redirect('/')}
});

router.get("/account/add",(req,res,next)=>{
  if(req.session.type=='admin'){
    return linuxBase.AccountClient((row)=>{res.end(JSON.stringify(row.plugin_Client.find(el=>el.LABEL=='Add User')))})
  }
  else{
    return JSON.stringify({message:"error-url-get"})
  }
})

router.get("/account/modifyUsername",(req,res,next)=>{
  if(req.session.type=='admin'){
    return linuxBase.AccountClient((row)=>{res.end(JSON.stringify(row.plugin_Client.find(el=>el.LABEL=='Modify Username')))})
  }
  else{
    return JSON.stringify({message:"error-url-get"})
  }
})

router.get("/account/modifyPassword",(req,res,next)=>{
  if(req.session.type=='admin'){
    return linuxBase.AccountClient((row)=>{res.end(JSON.stringify(row.plugin_Client.find(el=>el.LABEL=='Modify Password')))})
  }
  else{
    return JSON.stringify({message:"error-url-get"})
  }
})


router.post('/account/',(req,res,next)=>{
  if (req.session.type=='admin'  ){
      console.log(req.body);
      switch (req.body.type) {
        case 'remove':
          return login.remove(req.body.name,function(mess){res.end(JSON.stringify({message:mess}))})
        case 'modifyN':
          return login.modifyName(req.body.name,req.body.pass,req.body.newN,(mess)=>{res.end(JSON.stringify({message:mess}))})          
        case 'modifyP':
          return login.modifyPass(req.body.name,req.body.last,req.body.newp,(mess)=>{res.end(JSON.stringify({message:mess}))})
        case 'plugin':
                    
        case 'add':
         return login.add(req.body.name,req.body.pass,(mess)=>{res.end(JSON.stringify({message:mess}))})
        case null:
          return res.redirect('/');
      }
      return res.end()
  }
  else{
    return res.redirect('/');
  }
})

linuxBase.storageAdmin((rows)=>{
  rows.plugin_Storage.forEach(row=> {
    if(row.LABEL && row.STATUS=='1'){
      router.get(`/${row.RUN}`,(req,res,next)=>{
        if (req.session.type=='admin'){
        return res.end(JSON.stringify(row))
        }
        else{
          return res.end()
        }
      })
      router.post(`/${row.RUN}`,(req,res,next)=>{
        if(req.session.type=='admin'){
          console.log(req.body," ",row.RUN)
          storage[row.RUN](req.body.pass,'/dev/'+req.body.name);
        }
        return res.end("{}"); 
      })
    }
  });
})

module.exports =router;

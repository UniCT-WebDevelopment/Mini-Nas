const fs=require("fs");
const { sep } = require('path');
const inpath=require('inpath').sync;
const db=require('../Database/main');

function releve(table,obj){
    obj.forEach(element => {
        if(element.DEPENDENCE){
            element.DEPENDENCE.split(',').forEach(elemento => {
                if(inpath(elemento)){
                    db.update(table,'ACTIVABLE',1,`ID="${element.ID}"`)}
                else{
                    db.update(table,'ACTIVABLE',0,`ID="${element.ID}"`)
                    db.update(table,'STATUS',0,`ID="${element.ID}"`)
                }
            });   
        }
        else{
            db.update(table,'ACTIVABLE',1,`ID="${element.ID}"`)
        }
        
    });
    return obj;
}


module.exports={
    "storageAdmin":(call)=>{db.queryList('Plugin_Storage',(row)=>{let temp=new Object;temp.plugin_Storage=releve('Plugin_Storage',row);call(temp)})},
    "storageAdminActive":(call)=>{db.queryListWhere('Plugin_Storage','STATUS=1',(row)=>{let temp=new Object;temp.plugin_Storage=releve('Plugin_Storage',row);call(temp)})},
    "AccountAdmin":(call)=>{db.queryList('Plugin_Admin',(row)=>{let temp=new Object;temp.plugin_Account=releve('Plugin_Admin',row);call(temp)})},
    "AccountAdminActive":(call)=>{db.queryListWhere('Plugin_Admin','STATUS="1"',(row)=>{let temp=new Object;temp.plugin_Account=releve('Plugin_Admin',row);call(temp)})},
    "AccountClient":(call)=>{db.queryList('Plugin_Client',(row)=>{let temp=new Object;temp.plugin_Client=releve('Plugin_Client',row);call(temp)})},
    "AccountClientActive":(call)=>{db.queryListWhere('Plugin_Client','STATUS="1"',(row)=>{let temp=new Object;temp.plugin_Client=releve('Plugin_Client',row);call(temp)})},
    
    "changeStatus":(table, id,call)=>{
        db.query(table,`ID=${id}`,(row)=>{            
            if(row.ACTIVABLE==1){
                let state=row.STATUS===0?1:0;
                console.log(state)
                db.updateN(table,'STATUS',state,`ID="${id}"`,call(state));
        }})
    }
};

const db=require('../Database/main');
const {platform}=require('os');
const sep= platform==='win32'? '\\': require('path').sep;

function add(name , pass ,call){if(name!='pass' && name!='name' && name!='PASS' && name!='NAME' && name!='TYPE' && name!='type' && pass!='pass' && pass!='name' && pass!='PASS' && pass!='NAME'&& pass!='TYPE' && pass!='type'){db.insert('Account',['NAME','PASS','TYPE'],['?','?','?'],[name,pass,'client'],(message)=>call(message))}else{call('error')}}
function remove(name,call){db.query('Account',`NAME= "${name}"`,(row)=>{if(row && row.TYPE!='admin'){db.del('Account',`ID=${row.ID}`);call('done')}else{call('error')}})}
function verify(user,pass,call){
    if(user!='pass' && user!='name' && user!='PASS' && user!='NAME'&& user!='TYPE' && user!='type' && pass!='pass' && pass!='name' && pass!='PASS' && pass!='NAME'&& pass!='TYPE' && pass!='type' ){
        db.query('Account',`NAME="${user}" AND PASS="${pass}"`,
        (row)=>{row?call(true,row.TYPE):call(false,null)});
    }
    else{
        call(false,null);
    }
}
function list(call){db.queryListSelect('Account','NAME, TYPE',(row)=>{call(row)})}
module.exports={
    "add": add,
    "verify" : verify,
    "remove" : remove,
    "list":list,
    "modifyName": (name,pass,newN,call)=>{verify(name,pass,(v)=>{if(v){db.query('Account',`NAME= "${name}"`,(row)=>{if(row &&  newN!='pass' && newN!='name' && newN!='PASS' && newN!='NAME' && newN!='TYPE' && newN!='type' ){db.update('Account','NAME',newN,`ID=${row.ID}`);call('done')}else{call('error')}})}else{call('error')}})},
    "modifyPass": (name,last,newP,call)=>{verify(name,last,(v)=>{if(v && newP!='pass' && newP!='name' && newP!='PASS' && newP!='NAME'&& newP!='TYPE' && newP!='type'){db.query('Account',`NAME= "${name}"`,(row)=>{if(row){db.update('Account','PASS',newP,`ID=${row.ID}`);call('done')}else{call('error')}})}else{call('error')}})
    }    
  }
const sqlite3 = require('sqlite3').verbose();
let sep=require("path").sep;
const {platform}=require('os');
if (platform=='win32'){sep=`\\`;}

const db = new sqlite3.Database(__dirname+sep+'nas.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to database:'+__dirname+sep+"nas.db");
  });
  
function insert(table,column,type,arr,call){
  db.run(`INSERT INTO ${table} (${column.join(' , ')}) VALUES (${type.join(', ')})`,arr,(err)=>{if(err){console.log('errore inserimento:'+err.message);call('error')}else{call('done')}})
};
function query(table,queryWhere,call){
  db.get(`
    SELECT *
    FROM ${table}
    WHERE ${queryWhere}`,(err,row)=>{if (err){console.log(err.message)}call(row)}
  )
}

function queryList(table,call){
  db.all(`
    SELECT *
    FROM ${table}`,
    (err,row)=>{
      if (err){
        console.log(err.message)}
      call(row)
    }
  )
}

function queryListSelect(table,select,call){
  db.all(`
    SELECT ${select}
    FROM
     ${table}`,
    (err,row)=>{
      if (err){console.log(err.message)}
      call(row)
    }
  )
}

function queryListWhere(table,queryWhere,call){
  db.all(`
    SELECT *
    FROM ${table}
    WHERE ${queryWhere}`,(err,row)=>{if (err){console.log(err.message)}call(row)}
  )
}

function del(table,queryWhere){
  db.run(`DELETE FROM ${table} WHERE ${queryWhere}`)
}

function update(table,column,set,queryWhere){
  db.run(`
    UPDATE ${table}
    SET ${column} = "${set}"
    WHERE ${queryWhere}
  `,(err)=>{if(err){console.log(err.message)}})
}
function updateN(table,column,set,queryWhere){
  db.run(`
    UPDATE ${table}
    SET ${column} = ${set}
    WHERE ${queryWhere}
  `,(err)=>{if(err){console.log(err.message)}})
}

function test(table){
  db.each(`
    SELECT *
    FROM ${table}`
    ,(err,row)=>{if(err){console.log(err.message)}console.log(row)})
}


module.exports={
  insert:insert,
  del:del,
  query:query,
  queryList:queryList,
  queryListWhere:queryListWhere,
  queryListSelect:queryListSelect,
  test:test,
  update:update,
  updateN:updateN
};

  
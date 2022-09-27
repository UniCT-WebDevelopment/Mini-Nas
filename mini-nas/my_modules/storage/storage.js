const {readFileSync , writeFileSync, mkdir} =require('fs');
let storage= JSON.parse(readFileSync(__dirname+"/storage.json",'utf-8')); 
const { spawnSync, spawn}=require('child_process');
const { sep } = require('path');
var sudo = require('sudo');
const inpath=require('inpath').sync; 

let errorStorage=new Object;

function list(){
    if (!inpath('lsblk')){errorStorage.lsblk=true;storage=JSON.parse(JSON.stringify(errorStorage)); return}
    let listDisk=spawnSync('lsblk',['-J'],{encoding:'utf-8'});
     if(errorStorage.lsblk){delete errorStorage["lsblk"];}
    let i, temp;
    try{
        i= JSON.parse(listDisk.stdout);
        temp=i.blockdevices.filter(eleme=>eleme.ro===false);
    } catch(err){
        console.log("errore JSON:",err)
    }
    storage=new Object;
    storage.blockdevices=JSON.parse(JSON.stringify(temp));
    writeFileSync(__dirname+sep+'storage.json',JSON.stringify(storage),'utf-8');
}

let options = {
    cachePassword: false,
    prompt: '',
    spawnOptions: {stdio:'pipe'},
    encoding:'utf-8'
};

//create partition
function CreatePartition(pass,pathDisk){
    options.password=pass;  
    let child = sudo(['bash', __dirname+'/../../script/CreatePartition.sh',pathDisk], options);
    child.stdout.on('data', function (data) {console.log(data.toString())});
    child.stderr.on('data',(data)=>{console.log(data.toString())})
    child.stdin.write(pass+'\n')
    let child2= sudo(['mkfs.ext4', pathDisk+'1' ])
    child2.stdin.write(pass+'\n');
    child2.stdout.on('data', function (data) {console.log(data.toString())});
    child2.stderr.on('data',(data)=>{console.log(data.toString())})
    list();

}


//format partition
function FormatPartition(pass,disk){  
    Offline(pass,disk);
    options.password=pass;  
    let child = sudo(['bash', __dirname+'/../../script/FormatPartition.sh',pathDisk], options);
    child.stdout.on('data', function (data) {console.log(data.toString())});
    child.stderr.on('data',(data)=>{console.log(data.toString())})
    child.stdin.write(pass+'\n')

    list();
}
//offline
function Offline(pass,pathDisk){
    options.password=pass;  
    let child = sudo(['umount','/online'+pathDisk], options);
    child.stdin.write(pass+'\n')
    child.stdout.on('data', function (data) {console.log(data.toString())});
    child.stderr.on('data',(data)=>{console.log(data.toString())})
    list();
}
//online
async function Online(pass,pathDisk){
    options.password=pass;  
    let child1 = sudo(['mkdir','/online'], options);
    child1.stdin.write(pass+'\n');
    child1 = sudo(['mkdir','/online/dev/'], options);
    child1.stdin.write(pass+'\n');
    child1 = sudo(['mkdir','/online'+pathDisk], options);
    child1.stdin.write(pass+'\n');
    let child = sudo(['mount',pathDisk+'1','/online'+pathDisk], options);
    child.stdout.on('data', function (data) {console.log(data.toString())});
    child.stderr.on('data',(data)=>{console.log(data.toString())})
    child.stdin.write(pass+'\n');
    list();
}



module.exports={
    listDisk:()=>{list();return storage},
    FormatPartition:FormatPartition,
    CreatePartition:CreatePartition,
    Offline:Offline,
    Online:Online
};

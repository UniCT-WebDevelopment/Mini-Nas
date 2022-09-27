const { writeFileSync } = require('fs');
const os=require('os');
const { sep } = require('path');
let system= new Object;

function insert(){
	system.OS=os.type()+" "+os.release();
	system.HOST=os.hostname();
	system.MEMORY= os.totalmem();
	system.ARCH=os.arch();
	system.CPU=[];
	os.cpus().forEach(element => {	
		delete element["times"];
		system.CPU.push(element);
	});
	
}
 
function recalc(){
	system.UPTIME=os.uptime();
	system.FREMEM=os.freemem();
	try{writeFileSync(__dirname+sep+'sys.json',JSON.stringify(system),'utf-8');}
	catch(err){console.log('')}
	setTimeout(recalc,1000);
}
function upgrade(){
	insert();
	recalc();
}

upgrade();

module.exports=system;


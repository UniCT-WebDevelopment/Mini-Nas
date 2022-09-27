const section=document.querySelectorAll('#menu li');
const tab="&emsp;";
function CreateE(element,DElement){
  let temp=document.createElement(element);
  DElement.append(temp);
  return temp;
}
function CreateEC(element,DElement,classe){
  let temp=CreateE(element,DElement);
  temp.setAttribute('class',classe);
  return temp;
}
function CreateEI(element,DElement,id){
  let temp=CreateE(element,DElement);
  temp.setAttribute('id',id);
  return temp;
}
function CreateEIC(element,DElement,classe,id){
  let temp=CreateE(element,DElement);
  temp.setAttribute('class',classe);
  temp.setAttribute('id',id);
  return temp;
}

  section.forEach(element=>element.addEventListener('click',()=>{
  if(document.querySelector('#menu li[active=true]')){
  document.querySelector('#menu li[active=true]').setAttribute('active','false');}
  if(element.getAttribute('active')==='false'){ element.setAttribute('active','true')};
  prepareSend();
  }))

function clearAllElementChild(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}

function prepareSend(){
  let element= document.querySelector('#menu li[active=true]');
  let activeId=element.getAttribute('id');
  send('/admin/'+activeId,(data)=>{
    document.querySelector('#contenitor').setAttribute("class","");
    clearAllElementChild(document.querySelector('#contenitor'));
      switch (activeId) {
        case "account":
          account(data);
          break;
        case "setting":
          setting(data);
          break;
        case "storage":
          storage(data);
          break;
        case "system":
          system(data);
          break;
      }
})}

function send(req, res){
  fetch(req)
  .then(  (response)=> response.json())
  .then(  (data)=>res(data));   
}
function sendPost(req,res,bodyjson){
  if(typeof bodyjson=='object'){fetch(req, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyjson),
  })
    .then((response) => response.json())
    .then((data) => res(data))
  }
}

//account
function account(data){
  let contenitor1=document.querySelector('#contenitor')
  let tittlecard=CreateEC('div',contenitor1,'card')
  let tittle=CreateEC('h2',tittlecard,'neon')
  tittle.innerText='List account';
  let contenitor=CreateEC('div',contenitor1,'contenitor')
  
  data.Account.forEach(element => {
    let card=CreateEIC('div',contenitor,'card',element.NAME);
    let button_space=CreateEC('div',card,'buttons');
    if(element.TYPE!='admin'){
      let btn_rem=CreateEC('i',button_space,'material-icons btn-mod btn2');btn_rem.innerText="person_remove";
      btn_rem.addEventListener('click',()=>{
        sendPost('/plugin/account',(data)=>{
          contenitor.removeChild(document.querySelector(`#${element.NAME}.card`))
        },{name:element.NAME,type:'remove'})
      })

    }
    let btn_mod=CreateEC('i',button_space,'material-icons btn-mod btn2');btn_mod.innerText="manage_accounts";
    btn_mod.addEventListener('click',()=>{
      
      let win= CreateEIC('div', CreateEI('div',document.body,'coperta'), 'card','window');
        let button_space=CreateEC('div',win,'buttons');
        let close=CreateEC('i',button_space,'material-icons btn-mod btn2')
        close.innerText='cancel';
        function close_win(){document.body.removeChild(document.querySelector('#coperta'))}
        close.addEventListener('click',close_win)
        let gridwin=CreateEC('div',win,'bodycard')
        let btn_mod_name=CreateEC("div",gridwin,'btn');btn_mod_name.innerText="Modify Name";  
        btn_mod_name.addEventListener('click',()=>{
          send('/plugin/account/modifyUsername',(data)=>{
            console.log(data);
            clearAllElementChild(document.querySelector('#window'));
            let button_space=CreateEC('div',win,'buttons');
            let close=CreateEC('i',button_space,'material-icons btn-mod btn2')
            close.innerText='cancel';
            function close_win(){document.body.removeChild(document.querySelector('#coperta'))}
            close.addEventListener('click',close_win)
            let send_btn =CreateEC('i',button_space,'material-icons btn-mod btn2')
            send_btn.innerText='send';
            send_btn.addEventListener('click',()=>{
              let name=document.querySelector('input#name').value;
              let pass=document.querySelector('input#pass').value;
              sendPost('/plugin/account',(data)=>{clearAllElementChild(document.getElementById('contenitor'));close_win();send('/admin/account',(data)=>{account(data)})},{"pass":pass,"name":element.NAME,"newN":name,"type":"modifyN"})
            })
            let gridwin=CreateEC('div',win,'bodycard')
            function crea(element){
              if(element.element){
                temp=CreateE(element.element,gridwin);
                if(element.id){temp.setAttribute('id',element.id)}
                if(element.name){temp.setAttribute('name',element.name)}
                if(element.text){temp.innerText=element.text}
                if(element.label){temp.innerText=element.label}
                if(element.type){temp.setAttribute('type',element.type)}
              }
              if(element.next){crea(element.next)}
            }
            crea(JSON.parse(data.INPUT));
          })
        })
        let btn_mod_pass=CreateEC("div",gridwin,'btn');btn_mod_pass.innerText="Modify Password";
        btn_mod_pass.addEventListener('click',()=>{
          send('/plugin/account/modifyPassword',(data)=>{
            console.log(data);
            clearAllElementChild(document.querySelector('#window'));
            let button_space=CreateEC('div',win,'buttons');
            let close=CreateEC('i',button_space,'material-icons btn-mod btn2')
            close.innerText='cancel';
            function close_win(){document.body.removeChild(document.querySelector('#coperta'))}
            close.addEventListener('click',close_win)
            let send_btn =CreateEC('i',button_space,'material-icons btn-mod btn2')
            send_btn.innerText='send';
            send_btn.addEventListener('click',()=>{
              let last=document.querySelector('input#last').value;
              let newp=document.querySelector('input#newp').value;
              sendPost('/plugin/account',(data)=>{clearAllElementChild(document.getElementById('contenitor'));close_win();send('/admin/account',(data)=>{account(data)})},{"name":element.NAME,"last":last, "newp":newp,"type":"modifyP"})
            })
            let gridwin=CreateEC('div',win,'bodycard')
            function crea(element){
              if(element.element){
                temp=CreateE(element.element,gridwin);
                if(element.id){temp.setAttribute('id',element.id)}
                if(element.name){temp.setAttribute('name',element.name)}
                if(element.text){temp.innerText=element.text}
                if(element.label){temp.innerText=element.label}
                if(element.type){temp.setAttribute('type',element.type)}
              }
              if(element.next){crea(element.next)}
            }
            crea(JSON.parse(data.INPUT));
          })
        })
    })
    
    CreateE('p',card).innerText='Name:\t\t'+element.NAME
    CreateE('p',card).innerText='Type:\t\t'+element.TYPE

    
  })
  //card add user
  let card=CreateEIC('div',contenitor,'card center btn2','add_user_card');
  CreateEC('i',card,'material-icons center').innerText='person_add';

  card.addEventListener('click',()=>{
    send('/plugin/account/add',(data)=>{
        let win= CreateEIC('div', CreateEI('div',document.body,'coperta'), 'card','window');
        let button_space=CreateEC('div',win,'buttons');
        let close=CreateEC('i',button_space,'material-icons btn-mod btn2')
        close.innerText='cancel';
        function close_win(){document.body.removeChild(document.querySelector('#coperta'))}
        close.addEventListener('click',close_win)
        let send_btn =CreateEC('i',button_space,'material-icons btn-mod btn2')
        send_btn.innerText='send';
        send_btn.addEventListener('click',()=>{
          let name=document.querySelector('input#name').value;
          let password=document.querySelector('input#pass').value;
          sendPost('/plugin/account',(data)=>{clearAllElementChild(document.getElementById('contenitor'));close_win();send('/admin/account',(data)=>{account(data)})},{"name":name, "pass":password,"type":"add"})
        })
        let gridwin=CreateEC('div',win,'bodycard')
        function crea(element){
          if(element.element){
            temp=CreateE(element.element,gridwin);
            if(element.id){temp.setAttribute('id',element.id)}
            if(element.name){temp.setAttribute('name',element.name)}
            if(element.text){temp.innerText=element.text}
            if(element.label){temp.innerText=element.label}
            if(element.type){temp.setAttribute('type',element.type)}
          }
          if(element.next){crea(element.next)}
        }
        crea(JSON.parse(data.INPUT));

      })
    })
  }

//plugin
function setting(data){
  function sezion(plugin){
    if(plugin.label && plugin["plugin_"+plugin.label] && plugin["plugin_"+plugin.label][0] ){
      let contenitor1=document.querySelector('#contenitor')
      let tittlecard=CreateEC('div',contenitor1,'card')
      let tittle=CreateEC('h2',tittlecard,'neon')
      tittle.innerText=`Plugin ${plugin.label}`
      if(plugin["plugin_"+plugin.label]){
        let contenitor=CreateEC('div',contenitor1,'contenitor')
        plugin["plugin_"+plugin.label].forEach(plug=>{
          let card=CreateEIC('div',contenitor,'card',plug.ID);
          if(plug.LABEL){CreateE('h3',card).innerText=plug.LABEL;}
          if(plug.OS){CreateE('p',card).innerHTML="OS:"+tab+plug.OS;}
          if(plug.DEPENDENCE){   
            plug.DEPENDENCE=plug.DEPENDENCE.split(",")
            let div=CreateEC('div',card,'special');
            let p=CreateE('p',div).innerHTML="Dependencies:";
            plug.DEPENDENCE.forEach(dep=>CreateEC('p',div,'format').innerHTML=dep);
          }
          if(plug.DESCRIPTION){
            let div=CreateEC('div',card,'special');
            let p=CreateE('p',div).innerHTML="Description:";
            CreateEC('p',div,"format").innerHTML=plug.DESCRIPTION;
          }
          if(plug.MESSAGE){CreateEC('p',card,'message').innerHTML="Message:"+tab+plug.MESSAGE;}

          if(plug.ACTIVABLE){
            let temp=plug.ACTIVABLE=='1'?'yes':'no';  
            CreateE('p',card).innerHTML="Activable:"+tab+temp;
          }

          let text=plug.STATUS=="1"?"active":"disabled";
          CreateEIC('p',card,'status','status'+plugin.label+plug.ID).innerHTML="Status:"+tab+text;
      
          if(plug.ACTIVABLE && plug.ACTIVABLE=='1'){
            let btn =CreateEC('p',CreateEC('div',card,'mod right'),'material-icons btn');

            btn.innerText='edit_note';
            btn.addEventListener('click',()=>{sendPost('/plugin/changeStatus',(data)=>{
                let text1=data.Status=="1"?"active":"disabled";
                document.querySelector('#status'+plugin.label+plug.ID).innerHTML="Status:"+tab+text1;
                },{table:"plugin_"+plugin.label,id:plug.ID})
              })
          }
        })
  }}
  }
  if(data && data.list){
    data.list.forEach(plug=>{sezion(plug)})
  }
}
//storage
function storage(data){
  let contenitor =document.createElement('div');
  let tittle=document.createElement('h1');
  tittle.innerText='Disk manager';
  contenitor.setAttribute('class','contenitor');

  data.blockdevices.forEach(element => {
    let card=CreateEC('div',contenitor,'card disk');
    let icon =CreateEC('i',card,'material-icons');
    icon.innerText='storage';
    //online
    let entity= document.createElement('i');
    entity.innerText='circle';

    if(element.children){
      if(element.children.find(child=>child.mountpoints.find(mount=>mount==='/'||mount=='/boot'||mount=='/boot/efi'))){entity.setAttribute('class','material-icons offlimit');}
      else if(element.children.find(child=>child.mountpoints.find(mount=>mount==='/online/dev/'+element.name))) {entity.setAttribute('class','material-icons online');}
      else {entity.setAttribute('class','material-icons offline ');} 
    }
    else {entity.setAttribute('class','material-icons offline');}
    
    card.append(entity);
    //name
    entity=CreateE('p',card);
    entity.innerText='name:  '+element.name
    card.setAttribute('id',element.name)
    //type
    entity=CreateE('p',card);
    entity.innerText='Type:  '+element.type;

    //removible
    entity=CreateE('p',card);
    entity.innerText='Removible:  '+element.ro;
    //space
    entity=CreateE('p',card);
    entity.innerText='Total Space:  '+element.size;
    
    //modify
    if(!card.querySelector('.offlimit')){
      let temp=CreateEC('div',card,'mod');
      entity=CreateEC('p',temp,'material-icons btn');
      entity.innerText='edit_note';

      entity.addEventListener('click',function (){// click event
        const name=element.name;
        if(document.querySelector('#'+name+' .formcard')){
          document.querySelector('#'+name).removeChild(document.querySelector('#'+name+' .formcard'))}
        else{
          let formcard=CreateEIC('div',card,'formcard','modify');
          formcard.setAttribute('action','/storage');
          formcard.setAttribute('method','post');
          send('/plugin/storageAdminActive',(data)=>{
            let select=CreateEI('select',formcard,'CardpluginSelect'+name)
            data.plugin_Storage.forEach(plug=>{
              let INPUT=JSON.parse(plug.INPUT);
              let option=CreateE('option',select);
              option.setAttribute('value',plug.RUN)
              option.innerText=plug.LABEL;
              function change(){// event change
                if (select.value==plug.RUN){
                  clearAllElementChild(document.querySelector('#'+name+' .formcard'));
                  document.querySelector('#'+name+' .formcard').appendChild(select);
                  function plug_inp(inp){
                    if(inp.element){
                      let elementoI=CreateE(inp.element,formcard)
                      if(inp.name){elementoI.setAttribute('name',inp.name)}
                      if(inp.type){elementoI.setAttribute('type',inp.type)}
                      if(inp.options){
                        if(inp.options.url){
                          send(inp.options.url,(data)=>{
                            if(inp.options.array){
                              let temp=data[inp.options.array].find(e=>e.name==name);
                              if(inp.options.array2 && temp[inp.options.array2]){
                                temp[inp.options.array2].forEach(child=>{
                                  let o =CreateE('option',elementoI)
                                  o.setAttribute("value",child.name);
                                  o.innerText=child.name;
                                })
                              }

                            }
                          })
                        }
                      }
                    }
                  }
                  if(INPUT)plug_inp(INPUT);

                  let div=CreateEC('div',formcard,'sender');
                  let b=CreateE('label',div)
                  b.setAttribute('for','su')
                  b.innerText="Password User";
                  let a=CreateEI('input',div,'su'+name)
                  a.setAttribute('name','su');
                  a.setAttribute('type','password');
                  let c=CreateEC('input',div,'material-icons btn');
                  c.setAttribute('type','button');
                  c.setAttribute('value',"send");
                  c.addEventListener('click',()=>{
                    sendPost('/plugin/'+plug.RUN,(data)=>{
                      clearAllElementChild(document.querySelector('#contenitor'));
                      send('/admin/storage',(data)=>{storage(data)
                      })},{pass:document.getElementById('su'+name).value,name})
                  })
                }

              }
              select.addEventListener('change', change );
              change();
            })
          })
           
        }       
      })
    }
  })
  document.querySelector('#contenitor').append(tittle);
  document.querySelector('#contenitor').append(contenitor);
}
//system
function system(data){
  document.querySelector('#contenitor').setAttribute('class','center')
  let card=CreateEC('div',document.querySelector('#contenitor'),'card');
  data=Object.entries(data);
  data.forEach(arr => { 
    let div=CreateE('div',card)
    let temp=CreateE('h3',div)
    temp.innerHTML=arr[0]+":";
    temp=CreateEC('p',div,'format');
    if( typeof arr[1]==='object'){
      let obj=Object.entries(arr[1]);
      obj=Object.entries(obj[0][1]);
      obj.forEach(elle=>{
        let tmp=CreateEC('h4',div,"format")
        tmp.innerHTML=elle[0]+":";
        tmp=CreateEC('p',div,'format');
        tmp.innerHTML=elle[1]+"&emsp;"
      })
    }
    else{temp.textContent=arr[1];}
  })
  window.setTimeout(prepareSend , 100);
}




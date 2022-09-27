let cssState=false;
let css_night=document.getElementById("night");
css_night.addEventListener('click',function(){
    cssState=cssState?false:true;
    if(cssState){document.body.style.backgroundColor="#000" }
    else {document.body.style.backgroundColor="#fff"}
})
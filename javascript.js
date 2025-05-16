const container = document.querySelector(".container");
const gridInput = document.querySelector(".grid-input");
const gridSubmit = document.querySelector(".grid-submit");
const colorInput = document.querySelector(".color-input");
const rainbow = document.querySelector(".rainbow");
const clear = document.querySelector(".clear");

let filled=0;
let currentGrid = 16;
for(let i=0;i<16*16;i++){
    const div = document.createElement("div");
    div.style.height = "calc(100% / 16)";
    div.style.width = "calc(100% / 16)";
    container.appendChild(div);
}
let currentColor = "black";
addIt();
function addIt(){
let blocks = Array.from(document.querySelectorAll(".container div"));
for (let i=0;i<blocks.length;i++){
    blocks[i].addEventListener("mouseover",function(e){
        e.target.style.backgroundColor = currentColor;
        filled++;
        updateText()
        console.log(filled);
    })
}
}





let special = false;
const buttonSpecial = document.querySelector(".special");

// named function for toggling special effect
function specialEffect(e) {
  e.target.classList.add("special");
}

buttonSpecial.addEventListener("click", togSpecial);

function togSpecial() {
    console.log("Special toggled. State before:", special);
  let blocks = Array.from(document.querySelectorAll(".container div"));

  if (special) {
    blocks.forEach(element => {
      element.classList.remove("special");
      element.removeEventListener("mouseover", specialEffect);
    });
    addIt(); // re-add default coloring
    special = false;
    clearIt();
      console.log("Special OFF");
    return; 
  }

  // turn on special mode
  blocks.forEach(block => {
    block.addEventListener("mouseover", specialEffect);
    filled++;
    updateText()
    console.log(filled);
  });

  special = true;
    console.log("Special ON");
}













// button functions
gridSubmit.addEventListener("click",function(e){
    if(gridInput.value!=currentGrid && gridInput.value!=null && gridInput.value!=undefined && gridInput.value!=""){
    e.preventDefault();
    changeGrid(gridInput.value); 
    currentGrid = gridInput.value;  //grid button
    addIt();
    clearIt();
    }
});

colorInput.addEventListener("change",function(e){
    currentColor = e.target.value;   
    addIt();       //color picker
});


clear.addEventListener("click",function(e){
    e.preventDefault();
    container.style.backgroundColor = "gray";      //clear
    for(let i=0;i<currentGrid*currentGrid;i++){
        container.children[i].style.backgroundColor = "gray";
    }
    filled = 0;
    updateText();
    console.log(filled);
    let blocks = Array.from(document.querySelectorAll(".container div"));
if(special){
    blocks.forEach(element => {
        element.classList.remove("special");
    });
    return;
}
});



function clearIt(){

    for(let i=0;i<currentGrid*currentGrid;i++){
        container.children[i].style.backgroundColor = "gray";
    }
    filled = 0;
    updateText();
    console.log(filled);
    let blocks = Array.from(document.querySelectorAll(".container div"));
if(special){
    blocks.forEach(element => {
        element.classList.remove("special");
    });
    }
}







//rainbow full logic

rainbow.addEventListener("click",function(e){
    if(colorInput.disabled){
        colorInput.disabled = false;
        rainbow.classList.remove("tog");

        //rainbow button off
         let blocks = Array.from(document.querySelectorAll(".container div"));
    for (let i=0;i<blocks.length;i++){
    blocks[i].addEventListener("mouseover",function(e){
        e.target.style.backgroundColor = currentColor;
    })
}
        return;
    }
    e.preventDefault();
    
    rainbow.classList.add("tog");
    colorInput.disabled = true;     //rainbow button on


    let blocks = Array.from(document.querySelectorAll(".container div"));
    for (let i=0;i<blocks.length;i++){
    blocks[i].addEventListener("mouseover",function(e){
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        filled++;
        updateText();
        console.log(filled);
    })
} 
});








//work good



function changeGrid(size){
    if(size<1||size>100){
        alert("Please enter a number between 1 and 100");
        return;
    }
    container.innerHTML = "";
    for(let i=0;i<size*size;i++){
        const div = document.createElement("div");
        div.style.height = "calc(100% / "+size+")"; //creating grid
        div.style.width = "calc(100% / "+size+")";
        container.appendChild(div);
    }

}


function updateText(){
       let textBlock1 = document.querySelector(".text-content1");
    let textBlock2 = document.querySelector(".text-content2");

if (filled) {
    let maxFill = (currentGrid * currentGrid) / 2;
    console.log(`this is our max fill ${maxFill}`);
    console.log(`this is currently filled ${filled}`);

    if (filled < maxFill) {
        let alpha = filled / maxFill;
        textBlock1.style.opacity = alpha;
    }
    else if(filled>=maxFill){
        console.log("starting to fill");
        let alpha = (filled - maxFill) / maxFill;
        textBlock2.style.opacity = alpha;
    }
}
else{
    textBlock1.style.opacity = "0";
    textBlock2.style.opacity = "0";
}
}
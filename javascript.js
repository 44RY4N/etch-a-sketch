const container = document.querySelector(".container");
const gridInput = document.querySelector(".grid-input");
const gridSubmit = document.querySelector(".grid-submit");
const colorInput = document.querySelector(".color-input");
const rainbow = document.querySelector(".rainbow");
const clear = document.querySelector(".clear");

let currentColor = "black";
addIt();
function addIt(){
let blocks = Array.from(document.querySelectorAll(".container div"));
for (let i=0;i<blocks.length;i++){
    blocks[i].addEventListener("mouseover",function(e){
        e.target.style.backgroundColor = currentColor;
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
      console.log("Special OFF");
    return;
  }

  // turn on special mode
  blocks.forEach(block => {
    block.addEventListener("mouseover", specialEffect);
  });

  special = true;
    console.log("Special ON");
}










for(let i=0;i<16*16;i++){
    const div = document.createElement("div");
    div.style.height = "calc(100% / 16)";
    div.style.width = "calc(100% / 16)";
    container.appendChild(div);
}


// button functions
gridSubmit.addEventListener("click",function(e){
    e.preventDefault();
    changeGrid(gridInput.value);    //grid button
    addIt();
});

colorInput.addEventListener("change",function(e){
    currentColor = e.target.value;   
    addIt();       //color picker
});

clear.addEventListener("click",function(e){
    e.preventDefault();
    container.style.backgroundColor = "white";      //clear
    for(let i=0;i<16*16;i++){
        container.children[i].style.backgroundColor = "white";
    }
    let blocks = Array.from(document.querySelectorAll(".container div"));
if(special){
    blocks.forEach(element => {
        element.classList.remove("special");
    });
    return;
}
});






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

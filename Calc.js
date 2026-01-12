function addNum(num1,num2){
    return num1+num2;
}
function subtractNum(num1,num2){
    return num1-num2;
}
function multNum(num1,num2){
    return num1*num2;
}
function divideNum(num1,num2){
    if(num2 === 0) return "Error";
    return num1/num2;
}
let num1;
let num2;
let operator1;

function operate(num1,operator1,num2){
  if(operator1==="+"){
    return addNum(num1,num2);
  }
  else if(operator1==="-"){
  return subtractNum(num1,num2);
  }
  else if(operator1==="*"){
  return multNum(num1,num2);}
  else{
    return divideNum(num1,num2);
  }
}

const display=document.querySelector('#display');
const buttons=document.querySelectorAll('.numBtn');
const acBtn = document.querySelector('.acBtn');
const opButtons=document.querySelectorAll('.opBtn');

let currentDisplayValue="";


buttons.forEach((numBtn) => {
  numBtn.addEventListener("click", () => {
   currentDisplayValue+=numBtn.textContent;
   display.value=currentDisplayValue;
    
  });
});

acBtn.addEventListener("click", () => {
    currentDisplayValue = "";
    display.value = "0";
});

let firstNum = null; 
let operator = null;

opButtons.forEach((opBtn) => {
  opBtn.addEventListener("click", () => {
    if (currentDisplayValue !== "") {
      firstNum = Number(currentDisplayValue); 
      operator = opBtn.textContent;        
      currentDisplayValue = "";               
      display.value = "";                  
    }
  });
});
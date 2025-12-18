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
    return num1/num2;
}
let num1;
let num2;
let operator;

function operate(num1,operator,num2){
  if(operator==="+"){
    addNum(num1,num2);
  }
  else if(operator==="-"){
  subtractNum(num1,num2);
  }
  else if(operator==="*"){
  multNum(num1,num2);}
  else{
    divideNum(num1,num2);
  }
}

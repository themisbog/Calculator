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
let operator;

function operate(num1,operator,num2){
  if(operator==="+"){
    return addNum(num1,num2);
  }
  else if(operator==="-"){
  return subtractNum(num1,num2);
  }
  else if(operator==="*"){
  return multNum(num1,num2);}
  else{
    return divideNum(num1,num2);
  }
}

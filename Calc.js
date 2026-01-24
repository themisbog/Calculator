/**
 * Core Math Operations
 * Using Number() conversion to prevent accidental string concatenation 
 * during arithmetic tasks.
 */

let num1;
let num2;
let operator1;

function addNum(num1,num2){
    return Number(num1) + Number(num2);
}
function subtractNum(num1,num2){
    return Number(num1)-Number(num2);
}
function multNum(num1,num2){
    return Number(num1)*Number(num2);
}
function divideNum(num1,num2){
    if(num2 === "0") return "Error";
    return Number(num1)/Number(num2);
}
 
/**
 * Controller function to route math operations based on the operator string.
 */
function operate(num1,operator1,num2){
  if(operator1==="+"){
    return addNum(num1,num2);
  }
  else if(operator1==="-"){
    return subtractNum(num1,num2);
  }
  else if(operator1==="×"){
    return multNum(num1,num2);}
  else if(operator1==="÷"){
    return divideNum(num1,num2);}
}

// DOM Element Selectors
const display=document.querySelector('#display');
const buttons=document.querySelectorAll('.numBtn');
const acBtn = document.querySelector('.acBtn');
const opButtons=document.querySelectorAll('.opBtn');
const rsltButton=document.querySelector('.rsltBtn');
const decBtn = document.querySelector('.decBtn');
const delBtn = document.querySelector('.dltBtn');

// Application State Management
let currentDisplayValue="";      // Temporary buffer for the number being typed
let firstNum = null;             // Stores the result of the previous operation
let secndNum=null;               // Secondary operand
let operator = null;             // Current math symbol


/**
 * Digit Input Handling
 * Appends numbers to the current buffer and updates the UI display.
 */
buttons.forEach((numBtn) => {
  numBtn.addEventListener("click", () => {
   if (currentDisplayValue.length < 15) { 
   currentDisplayValue+=numBtn.textContent;
   display.value=currentDisplayValue;
   }
   if(currentDisplayValue!==firstNum){
    secndNum=currentDisplayValue;
   }
  });
});

// Decimal Button Click
decBtn.addEventListener('click', handleDecimal);

delBtn.addEventListener('click', handleBackspace);

/**
 * Reset Handler
 * Clears all state variables to return to the initial application state.
 */
acBtn.addEventListener("click", () => {
    currentDisplayValue = "";
    display.value = "0";
    firstNum = null;
    operator = null;
});

/**
 * Operator Handling (Logic for Chaining Operations)
 * If an operation is already pending, it evaluates it first (e.g., 12 + 7 + ...).
 * Otherwise, it captures the first number to prepare for the next input.
 */
opButtons.forEach((opBtn) => {
  opBtn.addEventListener("click", () => {
   // Trigger intermediate calculation if chaining (12 + 7 + 5) 
   if (firstNum!==null && operator!==null && currentDisplayValue !== ""){
        firstNum=operate(firstNum,operator,secndNum);
        display.value=firstNum;
      }else  if (currentDisplayValue !== "") {
        // First number capture
        firstNum = Number(currentDisplayValue);                 
    }
     // Prepare state for the next number entry    
      operator = opBtn.textContent;        
      currentDisplayValue = "";                    
  });
});

/**
 * Removes the last character from the display buffer (Backspace functionality).
 * Updates the display to "0" if the buffer becomes empty.
 */
function handleBackspace() {
    // slice(0, -1) extracts the string from index 0 up to (but not including) the last char
    currentDisplayValue = currentDisplayValue.slice(0, -1);
    
    // UI Update: Show the new value, or fallback to "0" if empty
    display.value = currentDisplayValue === "" ? "0" : currentDisplayValue;
}

/**
 * Handles the decimal point input.
 * Prevents multiple decimals in a single number (e.g., "5.5.5").
 * Adds a leading "0" if the decimal is the first character typed (e.g., ".5" -> "0.5").
 */
function handleDecimal() {
    // Validation: If a dot already exists, stop execution.
    if (currentDisplayValue.includes('.')) return;

    // UX Enhancement: If screen is empty, start with "0."
    if (currentDisplayValue.length < 15) {
        if (currentDisplayValue === '') {
        currentDisplayValue = '0';
    }
    }
    currentDisplayValue += '.';
    display.value = currentDisplayValue;
}

/**
 * Result Evaluation Handler (= Button)
 * Finalizes the calculation, handles decimal rounding for UI constraints,
 * and sets up the result for potential further chaining.
 */

rsltButton.addEventListener("click", () => {
    if (firstNum !== null && operator !== null && currentDisplayValue !== "") {
        // Compute the final result
        currentDisplayValue = operate(firstNum, operator, Number(currentDisplayValue));
        
        // Rounding logic: Prevent long decimals from overflowing the display
        if (!Number.isInteger(currentDisplayValue)) {
            currentDisplayValue = Number(currentDisplayValue.toFixed(3));
        }
        
        display.value = currentDisplayValue;
        
        // Allow the user to continue calculating using the result as the new first number
        firstNum = currentDisplayValue; 
        currentDisplayValue = "";
        operator = null;
    }
});
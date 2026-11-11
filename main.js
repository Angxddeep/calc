
const previousDisplay = document.querySelector('.previous-opvalue');
const currentDisplay = document.querySelector('.current-opvalue');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

// These are empty opertors
let currentOpvalue = '';
let previousOpvalue = '';
let operation = undefined;

// MAIN FUNCTIONS

// Reset everything to default
function clear() {
  currentOpvalue = '';
  previousOpvalue = '';
  operation = undefined;
}

// Remove last typed character
function deleteNumber() {
  currentOpvalue = currentOpvalue.toString().slice(0, -1);
}

// Add a digit or dot to the current number
function appendNumber(number) {
  // Prevent adding multiple decimal points
  if (number === '.' && currentOpvalue.includes('.')) return;
  
  // Converting to string and append
  currentOpvalue = currentOpvalue.toString() + number.toString();
}

// Set up the operator (+, -, ×, ÷)
function chooseOperation(selectedOperation) {
  if (currentOpvalue === '') return;

  // If there's already a previous number waiting, calculate it first
  if (previousOpvalue !== '') {
    compute();
  }

  operation = selectedOperation;
  previousOpvalue = currentOpvalue;
  currentOpvalue = '';
}

// Here si the actual calculation
function compute() {
  let computation;
  const prev = parseFloat(previousOpvalue);
  const current = parseFloat(currentOpvalue);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      if (current === 0) {
        alert("Cannot divide by zero!");
        clear();
        updateDisplay();
        return;
      }
      computation = prev / current;
      break;
    case '%':
      if (current === 0) {
        alert("Cannot divide by zero!");
        clear();
        updateDisplay();
        return;
      }
      computation = prev % current;
      break;
    default:
      return;
  }

  currentOpvalue = computation.toString();
  operation = undefined;
  previousOpvalue = '';
}

// Refresh what is visible on screen
function updateDisplay() {
  currentDisplay.innerText = currentOpvalue === '' ? '0' : currentOpvalue;

  if (operation != null) {
    previousDisplay.innerText = `${previousOpvalue} ${operation}`;
  } else {
    previousDisplay.innerText = '';
  }
}

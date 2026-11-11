
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

// CLICK DETECTORS

// When any number button (0-9, .) is clicked
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

// When any operator button (+, -, ×, ÷) is clicked
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

// When "=" is clicked
equalsButton.addEventListener('click', () => {
  compute();
  updateDisplay();
});

// When "AC" is clicked
clearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
});

// When "DEL" is clicked
deleteButton.addEventListener('click', () => {
  deleteNumber();
  updateDisplay();
});

// KEYBOARD SUPPORT
window.addEventListener('keydown', (e) => {
  // Numbers (0-9) and Decimal point (.)
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    appendNumber(e.key);
    updateDisplay();
  }

  // Operators (+, -, *, /, %)
  if (e.key === '+') {
    chooseOperation('+');
    updateDisplay();
  }
  if (e.key === '-') {
    chooseOperation('-');
    updateDisplay();
  }
  if (e.key === '*') {
    chooseOperation('×');
    updateDisplay();
  }
  if (e.key === '/') {
    e.preventDefault();   // prevents browser search shortcut. 
    chooseOperation('÷'); 
    updateDisplay();
  }
  if (e.key === '%') {
    chooseOperation('%');
    updateDisplay();
  }


  if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    compute();
    updateDisplay();
  }

  if (e.key === 'Backspace') {
    deleteNumber();
    updateDisplay();
  }

  if (e.key === 'Escape') {
    clear();
    updateDisplay();
  }
});
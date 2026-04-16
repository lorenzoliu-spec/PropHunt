let display = document.getElementById('display');
let currentInput = '';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    
    if (previousValue !== '' && currentInput !== '' && operator !== null) {
        calculate();
    }
    
    previousValue = currentInput;
    operator = op;
    currentInput = '';
    shouldResetDisplay = false;
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
    }
    updateDisplay();
}

function calculate() {
    if (previousValue === '' || currentInput === '' || operator === null) {
        return;
    }
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 0;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = null;
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousValue = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

// Initialize display
updateDisplay();

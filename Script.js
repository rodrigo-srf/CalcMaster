let currentInput = '';
let operation = null;
let previousInput = '';
let history = [];
let darkMode = false;

function appendNumber(number) {
    if (number === '±') {
        if (currentInput === '') {
            currentInput = '0';
        }
        currentInput = (parseFloat(currentInput) * -1).toString();
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendFunction(func) {
    const current = parseFloat(currentInput);

    if (func === '√') {
        const result = Math.sqrt(current);
        currentInput = result.toString();
    } else if (func === '^') {
        currentInput += '**'; // Adiciona o operador de exponenciação
    } else if (func === 'sin') {
        const result = Math.sin(toRadians(current));
        currentInput = result.toString();
    } else if (func === 'cos') {
        const result = Math.cos(toRadians(current));
        currentInput = result.toString();
    } else if (func === 'tan') {
        const result = Math.tan(toRadians(current));
        currentInput = result.toString();
    } else if (func === 'log') {
        const result = Math.log10(current);
        currentInput = result.toString();
    }
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;

    let result;
    switch (operation) {
        case '+':
            result = parseFloat(previousInput) + parseFloat(currentInput);
            break;
        case '-':
            result = parseFloat(previousInput) - parseFloat(currentInput);
            break;
        case '*':
            result = parseFloat(previousInput) * parseFloat(currentInput);
            break;
        case '/':
            result = parseFloat(previousInput) / parseFloat(currentInput);
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    addToHistory(`${previousInput} ${operation} ${currentInput} = ${result}`);
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function clearHistory() {
    history = [];
    updateHistory();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = history.map(entry => `<li>${entry}</li>`).join('');
}

function addToHistory(entry) {
    history.push(entry);
    updateHistory();
}

function toggleTheme() {
    darkMode = !darkMode;
    const calculator = document.querySelector('.calculator');
    const button = document.querySelector('.theme-switch button');

    if (darkMode) {
        calculator.classList.add('dark-mode');
        button.textContent = 'Modo Claro';
    } else {
        calculator.classList.remove('dark-mode');
        button.textContent = 'Modo Escuro';
    }
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
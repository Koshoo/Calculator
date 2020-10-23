// Query Selectors
const resultBox = document.querySelector('#result');
const nums = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');

// basic calculation functions;
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const calculate = (code, a, b) => {
  switch (code) {
    case 1:
      return add(a, b);
    case 2:
      return subtract(a, b);
    case 3:
      return multiply(a, b);
    case 4:
      return divide(a, b);
  }
};

// 0=none 1=add 2=subtract 3=multiply 4=divide;
let operatorCode = 0;
let displayNum = '0';
let firstOperand = '';
let secondOperand = '';

display(displayNum);
//display the num given as operator and fixing it if its too long;
function display(num) {
  let numString = '' + num;
  if (numString.length < 14) {
    resultBox.textContent = Number(num);
  } else {
    let fixed = '' + Number(num).toFixed(3);
    if (fixed.length < 14) {
      resultBox.textContent = fixed;
    }
  }
}

//perform operation and store result in firstOperand;
function operate(code) {
  if (secondOperand) {
    if (Number(secondOperand) === 0 && operatorCode === 4) {
      resultBox.textContent = 'NOPE';
    } else {
      firstOperand = Number(
        calculate(operatorCode, Number(firstOperand), Number(secondOperand))
      );
      display(firstOperand);
      secondOperand = '';
    }
  }
  operatorCode = code;
}

function numButtonHandler(num) {
  let input = num;
  if (operatorCode == 0) {
    if (!firstOperand) {
      firstOperand = input;
    } else if (firstOperand) {
      firstOperand += input;
    }
    displayNum = firstOperand;
  } else {
    if (secondOperand) {
      secondOperand += input;
      displayNum = secondOperand;
    } else {
      secondOperand = input;
      displayNum = secondOperand;
    }
  }
  display(displayNum);
}

function opButtonHandler(code) {
  switch (code) {
    case 'AC':
      ac();
      display(displayNum);
      break;

    case '+':
      operate(1);
      break;
    case '-':
      operate(2);
      break;

    case 'X':
      operate(3);
      break;

    case '÷':
      operate(4);
      break;
    case '=':
      if (secondOperand) {
        if (Number(secondOperand) == 0 && operatorCode == 4) {
          resultBox.textContent = 'NOPE';
          ac();
        } else {
          firstOperand = Number(
            calculate(operatorCode, Number(firstOperand), Number(secondOperand))
          );
          display(firstOperand);
          operatorCode = 0;
          secondOperand = '';
        }
      }
      break;
  }
}

//getting input from button press for numbers;
function clickButtonHandler(e) {
  let keyAsNum = Number(e.key);
  if (!isNaN(keyAsNum)) {
    numButtonHandler(e.key);
  } else {
    switch (e.key) {
      case '*':
        opButtonHandler('X');
        break;
      case '/':
        opButtonHandler('÷');
        break;
      case 'Enter':
        opButtonHandler('=');
        break;
      case 'Backspace':
        opButtonHandler('AC');
        break;
    }
    opButtonHandler(e.key);
  }
}

function ac() {
  firstOperand = '';
  secondOperand = '';
  operatorCode = 0;
  displayNum = '0';
}
// event listeners
operators.forEach((operator) =>
  operator.addEventListener('click', () =>
    opButtonHandler(operator.textContent)
  )
);

nums.forEach((num) =>
  num.addEventListener('click', () => numButtonHandler(num.textContent))
);

document.addEventListener('keydown', (e) => clickButtonHandler(e));

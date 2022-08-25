class Calculator {
  constructor(prevOperandText, currOperandText) {
    this.prevOperandText = prevOperandText;
    this.currOperandText = currOperandText;
    this.clear();
  }

  clear() {
    this.currOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }
  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currOperand.includes('.')) return
    this.currOperand = this.currOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.prevOperand !== '') {
      this.compute()
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }
  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) return
    switch (this.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '/':
        computation = prev / curr;
        break;
      default:
        return
    }
    this.currOperand = computation;
    this.prevOperand = '';
    this.operation = undefined;
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currOperandText.innerText = this.getDisplayNumber(this.currOperand);
    // this.prevOperandText.innerText = this.prevOperand;
    if (this.operation != null) {
      this.prevOperandText.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    } else {
      this.prevOperandText.innerText = '';
    }
  }
}

// Change Background color


// Calculator
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete');
const prevOperandText = document.querySelector('.previous-operand');
const currOperandText = document.querySelector('.current-operand');
const equalsButton = document.querySelector('.equals');

const calculator = new Calculator(prevOperandText, currOperandText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

// src/components/Calculator.tsx
import { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0"); // State for the calculator display
  const [operator, setOperator] = useState<string | null>(null); // State for the current operator
  const [firstValue, setFirstValue] = useState<number | null>(null); // State for the first operand
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false); // State to check if waiting for the second operand

  const inputDigit = (digit: string) => {
    if (waitingForSecondValue) {
      setDisplay(digit);
      setWaitingForSecondValue(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setOperator(null);
    setFirstValue(null);
    setWaitingForSecondValue(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplay(String(result));
      setFirstValue(result);
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  };

  const calculate = (
    firstOperand: number,
    secondOperand: number,
    operator: string
  ): number => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (firstValue !== null && operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecondValue(false);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-keys">
        <button onClick={clearDisplay} className="key-clear">
          AC
        </button>
        <button onClick={() => handleOperator("/")} className="key-operator">
          /
        </button>
        <button onClick={() => handleOperator("*")} className="key-operator">
          *
        </button>
        <button onClick={() => inputDigit("7")} className="key-digit">
          7
        </button>
        <button onClick={() => inputDigit("8")} className="key-digit">
          8
        </button>
        <button onClick={() => inputDigit("9")} className="key-digit">
          9
        </button>
        <button onClick={() => handleOperator("-")} className="key-operator">
          -
        </button>
        <button onClick={() => inputDigit("4")} className="key-digit">
          4
        </button>
        <button onClick={() => inputDigit("5")} className="key-digit">
          5
        </button>
        <button onClick={() => inputDigit("6")} className="key-digit">
          6
        </button>
        <button onClick={() => handleOperator("+")} className="key-operator">
          +
        </button>
        <button onClick={() => inputDigit("1")} className="key-digit">
          1
        </button>
        <button onClick={() => inputDigit("2")} className="key-digit">
          2
        </button>
        <button onClick={() => inputDigit("3")} className="key-digit">
          3
        </button>
        <button onClick={handleEquals} className="key-equals">
          =
        </button>
        <button onClick={() => inputDigit("0")} className="key-digit key-zero">
          0
        </button>
        <button onClick={inputDot} className="key-digit">
          .
        </button>
      </div>
    </div>
  );
}

export default Calculator;

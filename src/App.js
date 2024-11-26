import "./App.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState({
    success: false,
    error: false,
    result: "",
    errMsg: "",
  });

  const checkCalculation = (inputArr) => {
    let isValid = true;
    let result = 0;
    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i].includes("\n") || inputArr[i].includes("\\n")) {
        const subInput = inputArr[i].includes("\\n")
          ? inputArr[i].split("\\n")
          : inputArr[i].split("\n");
        const op = checkCalculation(subInput);
        if (!op.isValid) {
          isValid = false;
          break;
        }
        result += op.result;
      } else if (inputArr[i]) {
        const number = parseFloat(inputArr[i]);
        if (isNaN(number) || number < 0 || number > 1000) {
          isValid = false;
          break;
        }
        result += number;
      }
    }

    return { isValid, result };
  };

  const updateMessage = (success, error, result, errMsg) =>
    setMessage({
      success,
      error,
      result,
      errMsg,
    });

  const add = (event) => {
    event.preventDefault();

    if (isNaN(input)) {
      let inputArr = [];
      if (input.includes(",")) {
        inputArr = input.split(",");
      } else if (input.includes("//")) {
        const delimiter = input.charAt(2);
        let str = input.split("//")[1];
        inputArr = str.split(delimiter);
      }
      const { isValid, result } = checkCalculation(inputArr);
      if (isValid) {
        updateMessage(true, false, result, "");
      } else {
        updateMessage(false, true, "", `Error: Not a valid input "${input}"`);
      }
    } else {
      if (+input < 0 || +input > 1000) {
        updateMessage(false, true, "", `Error: Not a valid input "${input}"`);
      } else {
        updateMessage(true, false, input || 0, "");
      }
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <h1>String Calculator</h1>
        <form className="form-group" onSubmit={add}>
          <div className="input-box">
            <label htmlFor="stringInput">Input</label>
            <textarea
              id="stringInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter comma-separated numbers"
            />
          </div>
          <button type="submit">Calculate</button>
          <button
            type="reset"
            className="clear"
            onClick={() => {
              setInput("");
              updateMessage(false, false, "", "");
            }}
          >
            Clear
          </button>
        </form>
        <div
          className={`display-result ${
            message.success ? "success" : message.error ? "error" : ""
          }`}
        >
          {message.success ? `Result: ${message.result}` : message.errMsg}
        </div>
      </div>
    </div>
  );
}

export default App;

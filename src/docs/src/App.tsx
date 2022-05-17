import React, { useState } from "react";
import "./App.css";
import { DateTime } from "luxon";

// symlink in node_modules resolves wordle/solve-wordle to ./dist/lib/solve-wordle
import { getSolution } from "wordle/solve-wordle";

const App = () => {
  const [inputDate, setDate] = useState(
    DateTime.now().plus({ day: 1 }).toISO().split("T")[0]
  );

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputDate = DateTime.fromISO(event.target.value).toFormat(
      "yyyy-MM-dd"
    );
    setDate(newInputDate);
  };

  return (
    <div className="app">
      <h1 id="title"> Tomorrow's Wordle </h1>
      <div id="content">
        <div id="select"> Select date for past and future words </div>
        <input
          id="datePicker"
          type="date"
          value={inputDate}
          onChange={onChangeDate}
        />
      </div>

      <h3 id="word">
        {getSolution(DateTime.fromISO(inputDate).toFormat("MM/dd/yyyy"))}
      </h3>

      <div id="socials">
        <a href="https://twitter.com/dylanschlabach" target="_blank">
          <span id="twitter" className="social">
            <img src="twitter.png" width="32px" />
            Twitter
          </span>
        </a>
        <a href="https://github.com/DJSdev/tomorrows-wordle" target="_blank">
          <span id="github" className="social">
            <img src="github.png" width="32px"/>
            Github
          </span>
        </a>
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import { DateTime } from "luxon";
import { getSolutionNetwork } from './lib/solve-wordle';

const App = () => {
  const [inputDate, setDate] = useState(
    DateTime.now().toISO().split("T")[0]
  );

  const [solution, setSolution] = useState('');;

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputDate = DateTime.fromISO(event.target.value).toFormat('yyyy-MM-dd');
    setDate(newInputDate);
  };

  useEffect(() => {
    getSolutionNetwork(inputDate, setSolution);
  });

  const addThirtyDays = (date: Date) => {
    date.setDate(date.getDate() + 30);
    return date;
  }

  return (
    <div className="app">
      <h1 id="title"> Today's Wordle </h1>
      <div id="content">
        <div id="select"> Select date for past and future words </div>
        <input
          id="datePicker"
          type="date"
          value={inputDate}
          onChange={onChangeDate}
          min='2021-06-21' // First day available on NYT API
          max={DateTime.fromJSDate(addThirtyDays(new Date())).toFormat('yyyy-MM-dd')}
        />
      </div>

      <h3 id="word">
        {solution}
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

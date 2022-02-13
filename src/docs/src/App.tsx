import React, { useState } from "react";
import "./App.css";
import { DateTime } from "luxon";
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
    <div className="App-header">
      <h1> Tomorrow's Wordle </h1>

      <input
        id="datePicker"
        type="date"
        value={inputDate}
        onChange={onChangeDate}
      />

      <h3>{getSolution(DateTime.fromISO(inputDate).toFormat("MM/dd/yyyy"))}</h3>
    </div>
  );
};

export default App;

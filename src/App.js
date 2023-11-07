import React, { useState } from "react";
import ToDoTheme from "./ToDoTheme";
import "./App.css";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <ToDoTheme isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;

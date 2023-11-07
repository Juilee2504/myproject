import React, { useState, useRef } from "react";
import "./ToDoTheme.css";
import darkBannerImage from "./dark-banner-image.jpg";
import lightBannerImage from "./light-banner-image.jpg";

const ToDoTheme = ({ isDarkTheme, toggleTheme }) => {
  const bannerImage = isDarkTheme ? darkBannerImage : lightBannerImage;
  const inputColor = isDarkTheme ? '#25283d' : '#fff';
  const inputTextColor = isDarkTheme ? '#b2b4cc' : '#8d8a8a';
  const borderBottomColor = isDarkTheme ? '1px solid #303348' : '1px solid #e7e8ea';

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const todoInputRef = useRef(null);

  const addTodo = () => {
    const text = todoInputRef.current.value.trim();
    if (text !== "") {
      setTodos([...todos, { text, isComplete: false }]);
      todoInputRef.current.value = "";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isComplete = !updatedTodos[index].isComplete;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.isComplete);
    setTodos(updatedTodos);
  };

  const showFilterButtons = todos.length > 0;

  const reorderTodo = (fromIndex, toIndex) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedTodo);
    setTodos(updatedTodos);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, index) => {
    const fromIndex = e.dataTransfer.getData("text/plain");
    reorderTodo(parseInt(fromIndex), index);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.isComplete;
    if (filter === "completed") return todo.isComplete;
    return true;
  });

  const activeTodoCount = todos.filter((todo) => !todo.isComplete).length;

  return (
    <div className="toDoWrapper">
      <div
        className="headerBanner"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      ></div>
      <div className="toDoHeaderWrap">
        <div className="toDoHeaderText">To Do</div>
        <div className="themeIconWrap">
          <div
            className={`themeDarkSun ${isDarkTheme ? "active" : ""}`}
            onClick={toggleTheme}
          ></div>
          <div
            className={`themeDarkMoon ${!isDarkTheme ? "active" : ""}`}
            onClick={toggleTheme}
          ></div>
        </div>
      </div>

      <div className="todoApp">
        <div className="todoInput">
          <span className="todoInputSpan" onClick={addTodo}></span>
          <input
            ref={todoInputRef}
            type="text"
            placeholder="Create a new todo..."
            onKeyPress={handleKeyPress}
            style={{
              background: `${inputColor}`,
              color: `${inputTextColor}`,
            }}
          />
        </div>
        <div
          style={{
            background: `${inputColor}`,
          }}
        >
          <ul
            className="todoList"
            onDragOver={onDragOver}
            onDrop={(e) => {
              e.preventDefault();
            }}
          >
            {filteredTodos.map((todo, index) => (
              <li
                key={index}
                draggable="true"
                onDragStart={(e) => onDragStart(e, index)}
                onDrop={(e) => onDrop(e, index)}
                style={{
                  borderBottom: `${borderBottomColor}`,
                }}
              >
                <div className="checkbox">
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={() => toggleComplete(index)}
                />
                <label></label>
                </div>

                <span
                  className={todo.isComplete ? "completed" : ""}
                  style={{
                    color: `${inputTextColor}`,
                  }}>
                  {todo.text}
                </span>
                <button className="crossButton" onClick={() => deleteTodo(index)}></button>
              </li>
            ))}

            {showFilterButtons && (
              <li className="filterButtonsWrapper web">
                <div className="itemsLeft">{activeTodoCount} items left</div>
                <div className="filterButtons">
                  <button onClick={() => setFilter("all")}>All</button>
                  <button onClick={() => setFilter("active")}>Active</button>
                  <button onClick={() => setFilter("completed")}>Completed</button>
                </div>
                <button onClick={clearCompleted} className="clear-completed">
                  Clear Completed
                </button>
              </li>
            )}
          </ul>
        </div>
        <div>
          {showFilterButtons && (
            <div  
              className="filterButtonsWrapper mweb"  
              style={{
                background: `${inputColor}`,
              }}
            >
              <div className="filterButtons">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoTheme;

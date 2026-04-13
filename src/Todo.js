import React, { useEffect, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo, editTodo } from "./TodoSlice";
const Todo = () => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.todo);
  const [todo, settodo] = useState("");
  const [text, setText] = useState("");
  console.log(state);
  function handleaddtask() {
    if (todo) {
      dispatch(addTodo(todo));
      settodo("");
    } else alert("sheiyvane texti");
  }
  function handletoggle(id) {
    dispatch(toggleTodo(id));
  }
  function handlesave() {
    localStorage.removeItem("content");
    if (!state) return alert("add tasks first");
    localStorage.setItem("content", JSON.stringify(state));
    alert("saved successfully");
  }

  return (
    <div className="todoApp">
      <h1>
        To-Do List in <span>React</span>
      </h1>
      <div className="addinput">
        <input
          type="text"
          placeholder="Add a new task"
          value={todo}
          onChange={(e) => settodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleaddtask()}
        />
        <button className="addbtn" onClick={handleaddtask}>
          <Plus color="green"></Plus>
        </button>
        <button className="savebtn" onClick={handlesave}>
          Save Changes
        </button>
      </div>
      <ul className="tasks">
        {state &&
          state.map((todo, index) => (
            <li
              className={`task ${todo.completed ? "completed" : ""}`}
              key={todo.id}
            >
              <h2 className="tasknum">Task #{index + 1}</h2>
              <button
                className="completebtn"
                onClick={(event) => handletoggle(todo.id, event)}
              >
                {!todo.completed ? "complete" : "uncomplete"}
              </button>
              <p
                className="todotext"
                onInput={(e) => {
                  setText(e.currentTarget.innerText);
                }}
                onBlur={() => {
                  dispatch(editTodo({ id: todo.id, text }));
                }}
                contentEditable
                suppressContentEditableWarning={todo.completed ? false : true}
              >
                {todo.text}
              </p>
              <button
                className="close"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                <X color="red" size={13} />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;

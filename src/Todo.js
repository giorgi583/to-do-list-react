import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "./TodoSlice";
const Todo = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  const [todo, settodo] = useState("");
  console.log(state);
  function handleaddtask() {
    if (todo) {
      dispatch(addTodo(todo));
      settodo("");
    } else alert("sheiyvane texti");
  }
  function handletoggle(e) {
    e.target.parentElement.classList.toggle("completed");
    dispatch(toggleTodo(todo.id));
  }

  return (
    <div>
      <h1>To do list</h1>
      <input
        type="text"
        placeholder="sheiyvane teqsti"
        value={todo}
        onChange={(e) => settodo(e.target.value)}
      />
      <button onClick={handleaddtask}>add</button>
      <ul className="tasks">
        {state.map((todo) => (
          <li key={todo.id}>
            <button onClick={handletoggle}>completed</button>
            {todo.text}{" "}
            <button onClick={() => dispatch(removeTodo(todo.id))}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

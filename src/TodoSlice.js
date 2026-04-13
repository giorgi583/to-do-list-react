import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('content')) || [];
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) =>
     { state.push({ id: Date.now(), text: action.payload, completed: false })},
    removeTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.find((el) => el.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
       const { id, text } = action.payload;
  const todo = state.find(t => t.id === id);
  if (todo) {
    todo.text = text;
  }
  },
}});

export const { addTodo, removeTodo, toggleTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;

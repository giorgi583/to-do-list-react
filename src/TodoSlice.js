import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    text: "to do list",
    id: 1,
    completed: false,
  },
];
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
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;

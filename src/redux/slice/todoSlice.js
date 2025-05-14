import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: [], // tasks should be an array
    filter: 'All',
    additionalTasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setAdditionalTasks: (state, action) => {
      state.additionalTasks = action.payload;
    },
  },
});

export const {addTask, toggleTask, deleteTask, setFilter, setAdditionalTasks} =
  todoSlice.actions;
export default todoSlice.reducer;

import { createContext, useReducer } from 'react';

const TaskContext = createContext();

const initialState = {
  tasks: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        tasks: [...state.tasks, action.payload],
      };

    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
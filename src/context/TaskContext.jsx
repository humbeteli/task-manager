import { createContext, useReducer, useEffect } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };

    case "ADD_TASK":
      return {
        tasks: [...state.tasks, action.payload],
      };

    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "UPDATE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };

    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "SET_TASKS",
          payload: data,
        });
      });
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };

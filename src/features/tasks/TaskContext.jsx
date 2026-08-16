import { createContext, useReducer, useEffect } from "react";
import { fetchTasks } from "../../services/taskService";

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

  // Tətbiq açılanda taskları serverdən çəkirik
  useEffect(() => {
    fetchTasks().then((data) => {
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
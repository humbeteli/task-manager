import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const Tasks = () => {
  const { state, dispatch } = useContext(TaskContext);
  const navigate = useNavigate();

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: "Yeni tapşırıq",
    };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  };

  const deleteTask = (id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Tapşırıqlar</h1>

      <button onClick={addTask}>Tapşırıq əlavə et</button>

      {state.tasks.map((task) => (
        <div key={task.id}>
          <span>{task.title}</span>

          <button onClick={() => deleteTask(task.id)}>
            Sil
          </button>
        </div>
      ))}

      <button onClick={handleLogout}>Çıxış et</button>
    </div>
  );
};

export default Tasks;
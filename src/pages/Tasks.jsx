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

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "ADD_TASK",
          payload: data,
        });
      });
  };

  const deleteTask = (id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
  };

  const updateTask = (task) => {
    const updatedTask = {
      ...task,
      title: "Task dəyişdirildi",
    };

    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "UPDATE_TASK",
          payload: data,
        });
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

          <button onClick={() => deleteTask(task.id)}>Sil</button>

          <button onClick={() => updateTask(task)}>Dəyiş</button>
        </div>
      ))}

      <button onClick={handleLogout}>Çıxış et</button>
    </div>
  );
};

export default Tasks;

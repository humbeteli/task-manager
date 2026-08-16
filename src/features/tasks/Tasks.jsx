import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "./TaskContext";
import {
  createTask,
  deleteTaskById,
  updateTaskById,
} from "../../services/taskService";
import "./Tasks.css";
import deleteIcon from "../../assets/icons/trash.svg";
import editIcon from "../../assets/icons/edit.svg";
import exitIcon from "../../assets/icons/exit.svg";
import Logo from "../../components/Logo";
import ConfirmModal from "../../components/ConfirmModal";
import Toast from "../../components/Popup";
import saveBtn from '../../assets/icons/save-button.svg'
import cancelBtn from '../../assets/icons/cancel-button.svg'

const Tasks = () => {
  const { state, dispatch } = useContext(TaskContext);
  const navigate = useNavigate();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
  };

  // task elave edilir
  const addTask = () => {
    if (!newTaskTitle.trim()) {
      showToast("Tapşırıq adı boş ola bilməz!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
    };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });

    setNewTaskTitle("");

    createTask(newTask).catch(() => {
      showToast("Tapşırıq əlavə edilmədi, yenidən cəhd edin!");
      dispatch({
        type: "DELETE_TASK",
        payload: newTask.id,
      });
    });
  };

  // sil duymesine basanda modal acilir
  const askDeleteTask = (id) => {
    setTaskIdToDelete(id);
  };

  const confirmDeleteTask = () => {
    const id = taskIdToDelete;
    const taskToDelete = state.tasks.find((task) => task.id === id);

    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });

    setTaskIdToDelete(null);

    deleteTaskById(id).catch(() => {
      showToast("Silinmədi, yenidən cəhd edin!");
      dispatch({
        type: "ADD_TASK",
        payload: taskToDelete,
      });
    });
  };

  const cancelDeleteTask = () => {
    setTaskIdToDelete(null);
  };

  // deyis duymesi redakte rejimi
  const startEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  // redaktenin legvi
  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditingTitle("");
  };

  // redakteni saxla
  const saveEditTask = (task) => {
    if (!editingTitle.trim()) {
      showToast("Tapşırıq adı boş ola bilməz!");
      return;
    }

    const oldTask = task;
    const updatedTask = {
      ...task,
      title: editingTitle,
    };

    dispatch({
      type: "UPDATE_TASK",
      payload: updatedTask,
    });

    setEditingTaskId(null);
    setEditingTitle("");

    updateTaskById(updatedTask).catch(() => {
      showToast("Tapşırıq yenilənmədi, yenidən cəhd edin");
      dispatch({
        type: "UPDATE_TASK",
        payload: oldTask,
      });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="tasks-page">
      <div className="logo">
        <Logo />
      </div>

      <div>
        <input
          type="text"
          placeholder="Tabulaya əlavə et..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button className="add-button" onClick={addTask}>
          Tapşırıq əlavə et
        </button>
      </div>

      {state.tasks.map((task) => (
        <div className="task-item" key={task.id}>
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                className="edit-input"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                autoFocus
              />
              <div>
                <button
                  className="save-button"
                  onClick={() => saveEditTask(task)}
                  title="Saxla"
                >
                  <img src={saveBtn} alt="Save" />
                </button>
                <button
                  className="cancel-button"
                  onClick={cancelEditTask}
                  title="Ləğv et"
                >
                  <img src={cancelBtn} alt="Cancel" />
                </button>
              </div>
            </>
          ) : (
            <>
              <span>{task.title}</span>
              <div>
                <button
                  className="change-button"
                  onClick={() => startEditTask(task)}
                  title="Dəyiş"
                >
                  <img src={editIcon} alt="Edit Button" />
                </button>
                <button
                  className="delete-button"
                  onClick={() => askDeleteTask(task.id)}
                  title="Sil"
                >
                  <img src={deleteIcon} alt="Delete Button" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <button className="exit-button" onClick={handleLogout} title="Çıxış">
        <img src={exitIcon} alt="Exit" /> Çıxış et
      </button>

      {taskIdToDelete !== null && (
        <ConfirmModal
          message="Bu tapşırığı silmək istədiyinizə əminsiniz?"
          onConfirm={confirmDeleteTask}
          onCancel={cancelDeleteTask}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
};

export default Tasks;

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/tasks";

// tasklar serverden gelir
export const fetchTasks = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

// task yaradir
export const createTask = async (task) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

// taski silir
export const deleteTaskById = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

// taski yenileyir
export const updateTaskById = async (task) => {
  const response = await fetch(`${BASE_URL}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};
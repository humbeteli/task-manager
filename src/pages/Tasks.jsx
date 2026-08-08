import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
      <h1>Tapşırıqlar</h1>

      <button onClick={handleLogout}>Çıxış et</button>
    </>
  );
};

export default Tasks;
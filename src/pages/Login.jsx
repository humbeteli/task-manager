import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "test@gmail.com" && password === "888888") {
      localStorage.setItem("token", "mock-token");

      navigate("/tasks");
    } else {
      alert("Email və ya şifrə yanlışdır");
    }
  };

  return (
    <form className="login__page" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>

      <input
        id="email"
        type="email"
        placeholder="admin@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span>email: test@gmail.com</span>

      <label htmlFor="password">Şifrə</label>

      <input
        id="password"
        type="password"
        placeholder="Şifrənizi daxil edin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span>sifre: 888888</span>

      <button type="submit">Daxil ol</button>
    </form>
  );
};

export default Login;
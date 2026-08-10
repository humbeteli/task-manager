import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email daxil edin");
      isValid = false;
    }
    else if (!email.includes("@")) {
      setEmailError("Düzgün email daxil edin");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Şifrə daxil edin");
      isValid = false;
    }
    else if (password.length < 6) {
      setPasswordError("Şifrə ən azı 6 simvol olmalıdır");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("token", "mock-token");

      navigate("/tasks");
    } 
    else {
      setEmailError("Email və ya şifrə yanlışdır");
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

      {emailError && <p>{emailError}</p>}

      <label htmlFor="password">Şifrə</label>
      <input
        id="password"
        type="password"
        placeholder="Şifrənizi daxil edin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {passwordError && <p>{passwordError}</p>}

      <button type="submit">Daxil ol</button>
    </form>
  );
};

export default Login;

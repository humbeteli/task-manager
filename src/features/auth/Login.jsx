import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import loginIcon from '../../assets/icons/login-icon.svg'

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
    } else if (!email.includes("@")) {
      setEmailError("Düzgün email daxil edin");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Şifrə daxil edin");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Şifrə ən azı 6 simvol olmalıdır");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (email === "test@gmail.com" && password === "123456") {
      localStorage.setItem("token", "mock-token");

      navigate("/tasks");
    } else {
      setEmailError("Email və ya şifrə yanlışdır");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-page" onSubmit={handleSubmit}>
        <Logo />

        <div className="input-container">
          <div className="input-item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>email: test@gmail.com</span>

            {emailError && <p className="error-msg">{emailError}</p>}
          </div>

          <div className="input-item">
            <label htmlFor="password">Şifrə</label>
            <input
              id="password"
              type="password"
              placeholder="Şifrə daxil edin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>şifrə: 123456</span>

            {passwordError && <p className="error-msg">{passwordError}</p>}
          </div>
        </div>

        <button className="loginBtn" type="submit"><img src={loginIcon} alt="Daxil ol" /> Daxil ol</button>
        <span>Daxil olmaq üçün inputun altına yazılmış test mailindən və şifrədən istifadə edin.</span>
      </form>
    </div>
  );
};

export default Login;

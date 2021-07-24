import "./Login.css";

import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/ProfileSlice";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const loginFun = async () => {
    dispatch(
      loginAction({
        data: { userName, password },
        callback: () => {
          history.push("/chat");
        },
      })
    );
  };
  return (
    <div className="Login">
      <div className="form-login">
        <h1 className="login-title">
          <span>Login</span>
        </h1>
        <div className="form-item">
          <span>User:</span>{" "}
          <input
            className="userName"
            type="text"
            placeholder="Input user name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <span>Password:</span>{" "}
          <input
            type="password"
            className="password"
            placeholder="Input password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn-login-container">
          <button className="btn-login" type="button" onClick={loginFun}>
            Login
          </button>
        </div>
        <Link to="/register">
          <button className="btn-register">Need an account? Join here</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;

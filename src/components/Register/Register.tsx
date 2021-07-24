import "./Register.css";
import axios from "axios";
import { URL_BASE } from "../../pskg/Constance";
import { Link } from "react-router-dom";
const login = async () => {
  const res = await axios.get(URL_BASE);
};
function Register() {
  return (
    <div className="Login">
      <div className="form-login">
        <h1 className="login-title">
          <span>Sign up</span>
        </h1>
        <div className="form-item">
          <span>FullName:</span>
          <input
            className="userName"
            type="text"
            placeholder="Input full name"
          />
        </div>
        <div className="form-item">
          <span>User:</span>
          <input
            className="userName"
            type="text"
            placeholder="Input user name"
          />
        </div>
        <div className="form-item">
          <span>Password:</span>
          <input
            type="password"
            className="password"
            placeholder="Input password"
          />
        </div>
        <div className="btn-login-container">
          <button className="btn-login" type="button" onClick={login}>
            Register
          </button>
        </div>
        <Link to="/">
          <button className="btn-register">
            Already have an Account? Log in here
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;

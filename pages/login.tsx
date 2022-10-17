import { useState } from "react";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import { fetchLogin } from "../store/reducers/auth/LoginSlice";
import styled from "styled-components";

const Login = () => {
  const dispatch = useAppDispatch();
  const { payload, error, isLoading } = useAppSelector(
    (state) => state.loginReducer
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const submitHandler = () => {
    dispatch(fetchLogin(formData))
      .unwrap()
      .then(() => console.log("Logined succesfully"))
      .catch((err) => console.log(err));
  };
  return (
    <StyledLogin>
      <p className="subtitle">Auth</p>
      <h1 className="title">Login Page</h1>
      <label htmlFor="username" className="label">
        Username
      </label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="input"
        onChange={(e) =>
          setFormData({
            ...formData,
            username: e.target.value,
          })
        }
      />
      <label htmlFor="password" className="label">
        Password
      </label>

      <input
        type="text"
        name="password"
        placeholder="Password"
        className="input"
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />
      <button onClick={submitHandler} className="btn">
        Login
      </button>
      {payload.token && <p>Success</p>}
      {error && <p>{error}</p>}
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin-left: 280px;
  padding-left: 100px;
  padding-top: 50px;
  .title {
    margin-bottom: 35px;
  }
  .btn {
    color: var(--dark);
    background-color: white;
    &:hover {
      background-color: #a0a0a0;
    }
  }
`;

export default Login;

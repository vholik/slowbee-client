import { useState } from "react";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import { fetchLogin } from "../store/reducers/auth/LoginSlice";
import styled from "styled-components";
import { refreshToken, setUser } from "../store/reducers/auth/RefreshSlice";
import Router from "next/router";
import {
  disableModal,
  stateHandler,
  triggerMessage,
} from "../store/reducers/state/StatusSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.refreshReducer);
  const { error } = useAppSelector((state) => state.loginReducer);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const submitHandler = () => {
    try {
      if (formData.username.length < 4 || formData.username.length > 10) {
        throw new Error("Username min 4, max 10 symbols");
      }

      if (formData.password.length < 4 || formData.password.length > 10) {
        throw new Error("Password length min 4, max 10 symbols");
      }

      dispatch(fetchLogin(formData))
        .unwrap()
        .then((res) => {
          stateHandler({ message: "Succesfully logged in" }, dispatch);
          dispatch(setUser(res));
          Router.push("/");
        })
        .catch((err: string) => {
          stateHandler({ isError: true, message: err }, dispatch);
        });
    } catch (err: any) {
      stateHandler({ isError: true, message: err.message }, dispatch);
    }
  };

  return (
    <div className="container">
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
      </StyledLogin>
    </div>
  );
};

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  .error {
    color: red;
  }
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

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
import Link from "next/link";

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
          type="password"
          name="password"
          placeholder="Password"
          className="input password--input"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
        <p className="auth-link">
          Don't have an account?{" "}
          <Link href="/register">
            <span className="underlined">Register</span>
          </Link>
        </p>
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
  padding-bottom: 150px;
  .auth-link {
    font-size: 16px;
    color: var(--grey-60);
    margin-bottom: 25px;
    .underlined {
      color: white;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .password--input {
    margin-bottom: 25px;
  }
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
  @media only screen and (max-width: 850px) {
    padding-bottom: 350px;
  }
`;

export default Login;

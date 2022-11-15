import { useState } from "react";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import { fetchRegister } from "../store/reducers/auth/RegisterSlice";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
import { stateHandler } from "../store/reducers/state/StatusSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const { message, error, isLoading } = useAppSelector(
    (state) => state.registerReducer
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const submitHandler = () => {
    if (formData.password.length < 4 || formData.password.length > 10) {
      alert("Password can't be min 4 max 10");
    }
    if (formData.username.length < 4 || formData.username.length > 10) {
      alert("Password can't be min 4 max 10");
    }
    dispatch(fetchRegister(formData))
      .unwrap()
      .then(() => {
        stateHandler({ message: "Succesfully registered" }, dispatch);
        Router.push("/login");
      })
      .catch((err) => stateHandler({ isError: true, message: err }, dispatch));
  };
  return (
    <div className="container">
      <StyledRegister>
        <p className="subtitle">Auth</p>
        <h1 className="title">Register Page</h1>
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          name="username"
          type="text"
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
          name="password"
          type="password"
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
          Already have an account?{" "}
          <Link href="/login">
            <span className="underlined">Log in</span>
          </Link>
        </p>
        <button onClick={submitHandler} className="btn">
          Register
        </button>
      </StyledRegister>
    </div>
  );
};

const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 150px;

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
`;

export default Login;

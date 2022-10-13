import { useState } from "react";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import { fetchRegister } from "../store/reducers/RegisterSlice";
import styled from "styled-components";

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
      .then(() => console.log("Registered succesfully"))
      .catch((err) => console.log(err));
  };
  console.log(message, error);
  return (
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
        type="text"
        placeholder="password"
        className="input"
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />
      <button onClick={submitHandler} className="btn">
        Register
      </button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
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

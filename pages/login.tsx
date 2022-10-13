import { useState } from "react";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import { fetchLogin } from "../store/reducers/LoginSlice";

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
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) =>
          setFormData({
            ...formData,
            username: e.target.value,
          })
        }
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />
      <button onClick={submitHandler}>Submit</button>
      {payload.token && <p>Success</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

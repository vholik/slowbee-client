import { useState } from "react";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import { fetchRegister } from "../store/reducers/RegisterSlice";

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
    <div>
      <h1>Register Page</h1>
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
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

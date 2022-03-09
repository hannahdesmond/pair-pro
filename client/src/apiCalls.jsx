import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/api/users/login", userCredentials);
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("userToken", res.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    // <Navigate to="/home" replace={true} />;
  } catch (err) {
    toast("Incorrect email or password");
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const registerCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`/api/users/`, userCredentials)
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("userToken", res.data.token);
    console.log(res.data.token)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    // <Navigate to="/" replace={true} />; //this doesn't seem to take precedenc over the redirect in the app.js
  } catch (err) {
    toast("something is wrong");
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

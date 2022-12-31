import { useEffect, useState } from "react";
import PageTitle from "../../helpers/PageTitle";
import {
  Wrapper,
  RightSide,
  LeftSide,
  FormButton,
  FormInput,
  Form,
  FormtTitle,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_LOGIN_ERRORS,
  userRegister,
} from "../../../app/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// url
const imageUrl =
  "https://images.unsplash.com/photo-1531347118459-c3ea7a5ac61e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80";

const Register = () => {
  // dispatch
  const dispatch = useDispatch();

  // navigate
  const navigate = useNavigate();

  // user selector
  const { isLoading, register_error, user, login_error } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });
  // change
  const handleChange = (e) => {
    const { value, name } = e.target;

    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state);
    // dispatch => action => userRegister
    dispatch(userRegister(state));
  };

  // effect
  useEffect(() => {
    // check error => EXIST ? show toast : HIDE TOAST
    if (register_error) {
      toast.error(register_error.replace(/("|')/gi, ""));
    }

    // redirect
    if (user) {
      navigate("/dashboard");
    }
  }, [register_error, user]);

  // CLEAR LOGIN ERRORS
  useEffect(() => {
    if (login_error) {
      dispatch(CLEAR_LOGIN_ERRORS());
    }
  }, []);

  return (
    <>
      {/* toast */}
      <Toaster
        position="top-left"
        reverseOrder={true}
        toastOptions={{
          style: {
            fontSize: 14,
          },
        }}
      />
      {/* toast */}
      {/* helmet */}
      <PageTitle title="Register" desc="register page user..." />
      {/* helmet */}
      <Wrapper>
        <RightSide bgImage={imageUrl}>
          {/* form */}
          <Form className="animate__animated animate__backInLeft">
            <FormtTitle>Register</FormtTitle>
            <FormInput
              name="username"
              value={state.username}
              type="text"
              placeholder="Username..."
              onChange={handleChange}
            />
            <FormInput
              name="email"
              value={state.email}
              type="email"
              placeholder="Email..."
              onChange={handleChange}
            />
            <FormInput
              name="password"
              value={state.password}
              type="password"
              placeholder="Password..."
              onChange={handleChange}
            />
            <FormButton onClick={handleSubmit}>
              {isLoading ? "..." : "Signup"}
            </FormButton>
          </Form>
        </RightSide>
        <LeftSide bgImage={imageUrl}></LeftSide>
      </Wrapper>
    </>
  );
};

export default Register;

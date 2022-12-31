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
  CLEAR_REGISTER_ERRORS,
  userLogin,
} from "../../../app/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";
// image URL
const imageUrl = `https://images.unsplash.com/photo-1531347334762-59780ece5c76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`;
const Login = () => {
  // dispatch
  const dispatch = useDispatch();

  // selector
  const { login_error, isLoading, register_error } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // handle change fn()
  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // submit fn()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
    console.log(state);
  };

  // effect
  useEffect(() => {
    if (login_error) {
      toast.error(login_error.replace(/("|')/gi, ""), {
        style: {
          fontSize: 14,
        },
      });
    }
  }, [login_error]);

  // clear regsiter errors
  useEffect(() => {
    if (register_error) {
      dispatch(CLEAR_REGISTER_ERRORS());
    }
  }, []);

  return (
    <>
      {/* helmet */}
      <PageTitle title="Login" desc="login page user..." />
      {/* helmet */}

      {/* toaster */}
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            fontSize: 14,
          },
        }}
      />
      <Wrapper>
        <LeftSide bgImage={imageUrl}></LeftSide>
        <RightSide
          className="animate__animated animate__backInRight"
          bgImage={imageUrl}
        >
          <Form onSubmit={handleSubmit}>
            <FormtTitle>Login</FormtTitle>
            <FormInput
              type="email"
              placeholder="Email..."
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            <FormInput
              type="password"
              placeholder="Password..."
              name="password"
              value={state.password}
              onChange={handleChange}
            />
            <FormButton>{isLoading ? "..." : "Signin"}</FormButton>
          </Form>
        </RightSide>
      </Wrapper>
    </>
  );
};

export default Login;

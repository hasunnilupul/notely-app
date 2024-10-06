import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import PasswordInput from "../components/Input/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { handleAuthentication } = useContext(AuthContext); // to get access to the auth context
  const [formValues, setFormValues] = useState({ email: "", password: "" }); // form values
  const [errors, setErrors] = useState({}); // form errors

  // Handles the change event for form inputs
  // Updates the state of form values based on input name and value
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handles the submission of the login form, validating input fields and managing error states
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formValues.email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email",
      }));
      return;
    }

    if (!formValues.password) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Please enter the password",
      }));
      return;
    }

    // If there are no errors, clear them
    setErrors({});
    try {
      // login API call here
      const response = await axiosInstance.post("/auth/login", {
        email: formValues.email,
        password: formValues.password,
      });

      // If login is successful, set access token in local storage and navigate to home page
      if (response.data && response.data.accessToken) {
        await handleAuthentication(response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      // handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.message
      ) {
        setErrors((prevState) => ({
          ...prevState,
          server: error.response.data.message,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          server: "An unexpected error occurred.",
        }));
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleOnSubmit}>
            {/* Form Header */}
            <h4 className="text-2xl mb-7">Login to Notely</h4>

            {/* Email Field */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleOnChange}
              className="input-box"
            />
            {errors?.email && (
              <p className="text-red-500 text-xs -mt-3 mb-2">{errors.email}</p>
            )}
            {/* Password Field */}
            <PasswordInput
              name="password"
              value={formValues.password}
              onChange={handleOnChange}
              error={errors?.password}
            />

            {errors?.server && (
              <p className="text-red-500 text-xs mt-1 mb-1">{errors.server}</p>
            )}
            {/* Submit button */}
            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?
              <Link
                to="/signup"
                className="ms-1 font-medium text-primary underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

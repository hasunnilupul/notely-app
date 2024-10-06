import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import PasswordInput from "../components/Input/PasswordInput";
import { validateEmail } from "../utils/helper";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  }); // form values
  const [errors, setErrors] = useState({}); // form errors

  // Handles the change event for form inputs
  // Updates the state of form values based on input name and value
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handles the submission of the signup form, validating input fields and managing error states
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!formValues.name) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Please enter your name",
      }));
      return;
    }

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
        password: "Please enter a password",
      }));
      return;
    }

    // If there are no errors, clear them
    setErrors({});
    // call the login API here
  };
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleOnSubmit}>
            {/* Form Header */}
            <h4 className="text-2xl mb-7">Signup for Notely</h4>

            {/* Name Field */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleOnChange}
              className="input-box"
            />
            {errors.name && (
              <p className="text-red-500 text-xs -mt-3 mb-2">{errors.name}</p>
            )}
            {/* Email Field */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleOnChange}
              className="input-box"
            />
            {errors.email && (
              <p className="text-red-500 text-xs -mt-3 mb-2">{errors.email}</p>
            )}
            {/* Password Field */}
            <PasswordInput
              name="password"
              value={formValues.password}
              onChange={handleOnChange}
              error={errors.password}
            />
            {/* Submit button */}
            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?
              <Link
                to="/login"
                className="ms-1 font-medium text-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

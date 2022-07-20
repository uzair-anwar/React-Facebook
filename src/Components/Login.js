import { Button, Container, Paper, TextField } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../css/style.css";
import userContext from "../Context/userContext";
const dummyUser = {
  name: "test",
  email: "test@gmail.com",
  password: "test12",
  Id: "12925466298045118",
};
const Login = () => {
  const [users, addUser] = useState(dummyUser);
  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem("users"));
    if (tempUser !== null) {
      addUser(Array.from(tempUser));
    }
  }, []);

  const navigate = useNavigate();
  const context = useContext(userContext);

  //Function to check user is valid or not
  function checkUser(user) {
    let check = false;
    users.forEach((element) => {
      if (element.email === user.email && element.password === user.password) {
        context.setUser(element);
        localStorage.setItem("currentUser", JSON.stringify(element));
        check = true;
        return;
      }
    });
    if (check) return true;
    else return false;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Invalid email address"),
      password: Yup.string()
        .min(6, "Password should be greater than 6 digit")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const user = {
        email: values.email,
        password: values.password,
      };
      if (checkUser(user)) {
        navigate("/main");
      } else {
        alert("User does not Exist");
      }
    },
  });
  return (
    <Container className="container">
      <Paper className="paper">
        <div className="header">
          <h5>Create Account</h5>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <TextField
              className="input"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <TextField
              className="input"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <Button className="button" type="submit">
              Log in
            </Button>
          </form>
        </div>
        <div className="login-link">
          <p className="text">
            If you have no account, Click here{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;

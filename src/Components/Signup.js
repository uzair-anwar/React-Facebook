import { Button, Container, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../css/style.css";

const Signup = () => {
  const navigate = useNavigate();

  //function for adding user in database
  function addAccount(user) {
    if (localStorage.getItem("users") !== null) {
      let users = JSON.parse(localStorage.getItem("users"));
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.setItem("users", JSON.stringify([user]));
    }
  }

  //use Formik libraray
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
        .required("Required")
        .max(25, "Must be 25 characters or less"),

      email: Yup.string().required("Required").email("Invalid email address"),

      password: Yup.string()
        .min(6, "password should be greater than 6 digit")
        .required("Required"),
    }),

    onSubmit: (values) => {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
        Id: Math.random().toString().slice(2),
      };

      addAccount(user);
      alert("Account Created");
      navigate("/");
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
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Name"
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="error-msg">{formik.errors.name}</div>
            ) : null}

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
              <div className="error-msg">{formik.errors.email}</div>
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
              <div className="error-msg">{formik.errors.password}</div>
            ) : null}

            <Button className="button" type="submit">
              Sign Up
            </Button>
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            Already have Account{" "}
            <span>
              <Link to="/">Log In</Link>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Signup;

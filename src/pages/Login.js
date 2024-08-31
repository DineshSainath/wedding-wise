/* eslint-disable */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../redux/actions/authActions"; // Add this action in your redux actions

function Login() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values, { setSubmitting }) => {
    dispatch(loginUser(values));
    setSubmitting(false);
  };

  return (
    <Container>
      <h2 className="mb-3">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Field name="email" type="email" as={Form.Control} />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Field name="password" type="password" as={Form.Control} />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Login;

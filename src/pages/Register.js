/* eslint-disable */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../redux/actions/authActions"; // Add this action in your redux actions

function Register() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = (values, { setSubmitting }) => {
    dispatch(registerUser(values));
    setSubmitting(false);
  };

  return (
    <Container>
      <h2 className="mb-3">Register</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Field name="name" type="text" as={Form.Control} />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </Form.Group>
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
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Field name="confirmPassword" type="password" as={Form.Control} />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Register;

import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let rendercount = 0;

let schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Enter Your Full Name"),
  email: Yup.string()
    .email()
    .required("Email is Required")
    .matches(/^[a-z0-9]+@[a-z]{3,5}.[a-z]{2,4}$/, "Enter Your valid Email"),
  age: Yup.number()
    .integer()
    .positive()
    .required("enter your age")
    .min(18, "enter age between 18 to 30")
    .max(30, "enter age between 18 to 30"),

  password: Yup.string().required("password is required"),
  
  

  cPassword: Yup.string().required("confirm password is required")
    .oneOf([Yup.ref("password"), null], "password must watch")
});
const Signup = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gap: "20px",
  };
  rendercount++;
  let [input, setInput] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let handleData = (data) => {
    console.log(data);
  };

  return (
    <Paper
      elevation={20}
      style={paperStyle}
      component="form"
      onSubmit={handleSubmit(handleData)}
    >
      <Typography textalign="center" varient="h6">
        Create Account-{rendercount}
      </Typography>
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Age"
        {...register("age")}
        error={!!errors.age}
        helperText={errors.age?.message}
      />
      <TextField
        label="Password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        label="Confirm Password"
        {...register("cPassword")}
        error={!!errors.cPassword}
        helperText={errors.cPassword?.message}
      />
      <Button variant="contained" type="submit">
        Signup
      </Button>
    </Paper>
  );
};

export default Signup;

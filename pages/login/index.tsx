import { useLoginMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import type { RootState } from "@/store/store";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

interface ITarget {
  target: {
    name: string;
    value: string;
  };
}

const LoginHome = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }: ITarget) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleLoginClick = async () => {
    try {
      const user = await login(formState).unwrap();
      dispatch(setCredentials(user));
      console.log(user, "user");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <input onChange={handleChange} type="text" name="username" />
        <input onChange={handleChange} type="text" name="password" />
        <button
          onClick={() => {
            handleLoginClick();
          }}
        >
          Login
        </button>
      </div>
      <div>
        <p>{auth.id}</p>
        <p>{auth.token}</p>
        <p>{auth.username}</p>
      </div>
    </>
  );
};

export default LoginHome;

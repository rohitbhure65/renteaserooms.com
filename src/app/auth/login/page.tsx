"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from "@/styles/Register.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { Form } from "rsuite";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login faild", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={styles.signup_form}>
      <div className={styles.form_container}>
        <p className={styles.title}>
          {loading ? <CircularProgress /> : "Welcome Back"}
        </p>
        <Form className={styles.form}>
          <input
            type="email"
            name="email"
            id="email"
            className={styles.input}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className={styles.input}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter password"
            required
          />
          <p className={styles.page_link}>
            {/* <span className={styles.page_label}>Forgot Password?</span> */}
          </p>
          <button onClick={onLogin} className={styles.form_btn}>
            {buttonDisabled ? "No Login" : "Login"}
          </button>
        </Form>
        <p className={styles.sign_up_label}>
          dont have an account?
          <span className={styles.sign_up_link}>
            <Link href="/auth/register">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

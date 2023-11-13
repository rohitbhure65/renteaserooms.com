"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "@/styles/Register.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { Form } from "rsuite";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    city: "",
    profileImg: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", user);
      console.log("Signup success", response.data);
      router.push("/auth/login"); 
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={styles.signup_form}>
      <div className={styles.form_container}>
        <p className={styles.title}>
          {loading ? <CircularProgress /> : "Create account"}
        </p>
        <Form className={styles.form}>
          <input
            type="text"
            name="name"
            id="name"
            className={styles.input}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter name"
            required
          />
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
            type="phone"
            name="phone"
            id="phone"
            className={styles.input}
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            placeholder="Enter mobile number"
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
          <input
            type="text"
            name="role"
            id="role"
            className={styles.input}
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            placeholder="agent / builder / User"
            required
          />
          <input
            type="text"
            name="city"
            id="city"
            className={styles.input}
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
            placeholder="Enter your city"
            required
          />
          <input
            type="file"
            name="profileImg"
            id="profileImg"
            className={styles.input}
            value={user.profileImg}
            onChange={(e) => setUser({ ...user, profileImg: e.target.value })}
            placeholder="upload profile image"
          ></input>
          <p className={styles.page_link}>
            {/* <span className={styles.page_label}>Forgot Password?</span> */}
          </p>
          <button onClick={onSignup} className={styles.form_btn}>
            {buttonDisabled ? "No signup" : "Sign up"}
          </button>
        </Form>
        <p className={styles.sign_up_label}>
          Already have an account?
          <span className={styles.sign_up_link}>
            <Link href="/auth/login">Login</Link>
          </span>
        </p>
        {/* <div className={styles.buttons_container}>
        <div className={styles.apple_login_button}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            className={styles.apple_icon}
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
          </svg>
          <span>Log in with Apple</span>
        </div>
        <div className={styles.google_login_button}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            x="0px"
            y="0px"
            className={styles.google_icon}
            viewBox="0 0 48 48"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <span>Log in with Google</span>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default Register;

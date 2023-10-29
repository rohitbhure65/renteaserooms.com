"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    profileImg: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/register", user);
      router.push("/auth/login")
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
    <div>
      <h1>{loading ? "Processing" : "signup"}</h1>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Enter name"
        required
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter email"
        required
      />
      <input
        type="phone"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
        placeholder="Enter mobile number"
        required
      />
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter password"
        required
      />
      <input
        type="text"
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        placeholder="agent / builder / User"
        required
      />
      <input
        type="file"
        value={user.profileImg}
        onChange={(e) => setUser({ ...user, profileImg: e.target.value })}
        placeholder="upload profile image"
      ></input>
      <button onClick={onSignup}>
        {buttonDisabled ? "No signup" : "singup"}
      </button>
    </div>
  );
};

export default Register;

"use client";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [role, setRole] = useState("");
  const [profileImg, setprofileImg] = useState("");

  const signup = async () => {
    let result = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
        role,
        profileImg,
      }),
    });
    result = await result.json();
    if (result.success) {
      alert("sign up successful");
    }
  };
  return (
    <div>
      <h1>Sign up page</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        required
      />
      <input
        type="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter mobile number"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required
      />
      <input
        type="password"
        value={cpassword}
        onChange={(e) => setCpassword(e.target.value)}
        placeholder="confirm password"
        required
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="agent / builder / User"
        required
      />
      <input
        type="file"
        value={profileImg}
        onChange={(e) => setprofileImg(e.target.value)}
        placeholder="upload profile image"
      ></input>
      <button onClick={signup}>Sign up</button>
    </div>
  );
};

export default Register;

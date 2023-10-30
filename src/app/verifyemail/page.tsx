"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verifyed, setVerifyed] = useState(false);
  const [error, setError] = useState(false);

  const verifyuserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerifyed(true);
    } catch (error: any) {
      setError(true);
      // console.log(error.respone.data)
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyuserEmail();
    }
  }, [token]);

  return (
    <>
      <h1>verify email</h1>
      <h2>{token ? `${token}` : "no token"}</h2>

      {verifyed && (
        <div>
          <h2>email verifyed</h2>
          <Link href="/auth/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </>
  );
}

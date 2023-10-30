"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profilepage = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>profile page</h1>
      <hr />
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Profilepage;

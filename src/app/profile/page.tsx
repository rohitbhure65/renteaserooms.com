"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Profilepage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/auth/login");
    } catch (error: any) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    // console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <>
      <h1>profile page</h1>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <Image src="/default_profileImg.svg" width={100} height={100} alt="profile image"></Image>
      <hr />
      <button onClick={logout}>logout</button>
      <button onClick={getUserDetails}>Getuser Details</button>
    </>
  );
};

export default Profilepage;

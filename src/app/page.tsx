"use client"
import React from "react";
import App from "@/App";
import "@/index.scss"
import { AuthContextProvider } from "@/context/AuthContext";
import { SocketContextProvider } from "@/context/SocketContext.jsx";
const page = () => {
  return (
    <div>
    <>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </>
    </div>
  )
}

export default page

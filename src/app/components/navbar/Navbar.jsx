"use client";

import { useContext, useState } from "react";
import "./navbar.scss";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import Image from "next/image";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span>LamaEstate</span>
        </Link>
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <Image src={currentUser.avatar || "/noavatar.jpg"} alt="Avatar" width={50} height={50} />
            <span>{currentUser.username}</span>
            <Link href="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/login">Sign in</Link>
            <Link href="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <Image
            src="/menu.png"
            alt="Menu"
            width={30} height={30}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Agents</Link>
          <Link href="/login">Sign in</Link>
          <Link href="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

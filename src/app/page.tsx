import Image from "next/image";
// import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <button className="rounded bg-red-500 text-white px-5 py-2">
      <Link href="/auth/register">Register</Link> 
      </button>
    </main>
  );
}

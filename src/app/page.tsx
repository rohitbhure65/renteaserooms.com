import Image from "next/image";
// import styles from './page.module.css'
import Link from "next/link";
import Loader from "./components/Loader/Loader";
export default function Home() {
  return (
    <main>
      <Link href="/auth/register">Register</Link>
     <Loader/>
    </main>
  );
}

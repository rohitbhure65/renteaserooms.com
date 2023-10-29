import Image from 'next/image'
// import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {

  return (
    <main>
     <Link href="/signup">Sign up</Link>
     <Link href="/auth/register">Register</Link>
    </main>
  )
}

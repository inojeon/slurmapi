import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex gap-x-4 px-4 ">
      <Link href="/">
        <a className="hover:font-bold">
          Sbtach
        </a>
      </Link>
      <Link href="/squeue">
        <a className="hover:font-bold">
          Squeue
        </a>
      </Link>
    </div>
  )
}
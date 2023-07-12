import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href="/users">
        <button className="text-blue-500 hover:text-white bg-transparent hover:bg-blue-500 text-lg font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Enter Users Page
        </button>
      </Link>
    </div>
  );
}

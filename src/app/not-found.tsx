import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1>Coming Soon</h1>
      <p>This page has not been implemented yet.</p>

      <Link href="/" className="mt-4 underline">
        Go Home
      </Link>
    </main>
  );
}
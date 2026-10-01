import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          MyStore
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
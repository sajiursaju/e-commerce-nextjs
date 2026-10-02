import Link from "next/link";
import CartLink from "@/components/CartLink";
import AuthLinks from "./AuthLinks";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          MyStore
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products">Products</Link>
          <CartLink />
          <AuthLinks />
        </nav>
      </div>
    </header>
  );
}
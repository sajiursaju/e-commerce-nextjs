"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type User = { id: number; name: string; role: string; hasAvatar?: boolean };

export default function AuthLinks() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  if (user) {
    const isAdmin = user.role === "admin";
    return (
      <div className="flex items-center gap-3">
        {user.hasAvatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/api/account/avatar" alt="" className="h-8 w-8 rounded-full object-cover" />
        )}
        <span>Hi, {user.name}</span>
        {!isAdmin && (
          <>
            <Link href="/orders" className="underline">
              My Orders
            </Link>
            <Link href="/account" className="underline">
              Account
            </Link>
          </>
        )}
        <button onClick={handleLogout} className="underline">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/login" className="underline">Login</Link>
      <Link href="/signup" className="underline">Sign up</Link>
    </div>
  );
}
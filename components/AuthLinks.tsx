"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthLinks() {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
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
    return (
      <div className="flex items-center gap-3">
        <span>Hi, {user.name}</span>
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
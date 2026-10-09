"use client";
import { useState } from "react";
import { isStaff } from "@/lib/permissions";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) return setError("Wrong email or password");

    const me = await (await fetch("/api/me")).json();
    const role = me.user?.role ?? me.role;
    if (!isStaff(role)) {
      await fetch("/api/logout", { method: "POST" });
      return setError("This is not a staff account");
    }
    window.location.href = "/admin";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form onSubmit={submit} className="w-80 space-y-3 rounded bg-white p-6">
        <h1 className="text-xl font-bold">Staff Login</h1>
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded bg-black p-2 text-white">Login</button>
      </form>
    </div>
  );
}
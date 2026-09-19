"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function MinutesLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(
      new FormData(event.currentTarget).get("password") ?? "",
    );
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/minutes/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Wrong password.");
        return;
      }
      router.refresh();
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8"
    >
      <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
        Enter password
      </h2>
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Meeting minutes are for Home Run Club officers and coaching staff.
      </p>
      <label className="mt-6 block">
        <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
          Password
        </span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-black px-3 text-sm text-white outline-none focus:border-red-500"
          required
        />
      </label>
      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants(), "mt-6 h-10 px-4 uppercase")}
      >
        {pending ? "Checking…" : "Open minutes"}
      </button>
    </form>
  );
}

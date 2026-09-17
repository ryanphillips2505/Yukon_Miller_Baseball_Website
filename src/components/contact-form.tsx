"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { program } from "@/lib/site";
import { useState } from "react";

type Status = "idle" | "error" | "success";

const topics = [
  "General question",
  "Schedule or fields",
  "Roster or coaches",
  "Home Run Club / sponsorship",
  "Camps",
  "College recruiting",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) {
      setStatus("error");
      setError("Enter your name so the staff knows who to write back.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Enter a working email address.");
      return;
    }
    if (message.length < 12) {
      setStatus("error");
      setError("Add a short note so we know how to help.");
      return;
    }

    const subject = encodeURIComponent(`Yukon Baseball — ${topic || "Message"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`,
    );
    window.location.href = `mailto:${program.email}?subject=${subject}&body=${body}`;
    setStatus("success");
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(program.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy the address. Use the email link instead.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            className="h-10 bg-black/40"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="h-10 bg-black/40"
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="topic">Topic</Label>
        <select
          id="topic"
          name="topic"
          className="h-10 w-full rounded-lg border border-input bg-black/40 px-2.5 text-sm"
          defaultValue="General question"
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          className="min-h-32 bg-black/40"
          placeholder="How can the Millers staff or Home Run Club help?"
        />
      </div>

      {status === "error" && error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}
      {status === "success" ? (
        <p
          role="status"
          className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-100"
        >
          Your email app should open to {program.email}. If it does not, copy
          the address and send the note yourself.
        </p>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" className="h-10 px-4">
          Open email to the staff
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10 border-white/15 px-4"
          onClick={copyEmail}
        >
          {copied ? "Copied" : "Copy email address"}
        </Button>
      </div>
    </form>
  );
}

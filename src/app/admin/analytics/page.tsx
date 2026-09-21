import { CommandDashboard } from "@/components/command-dashboard";
import { adminAuthed } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  if (!(await adminAuthed())) redirect("/admin");
  return <CommandDashboard />;
}

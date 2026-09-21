import { CommandLogin } from "@/components/command-login";
import { adminAuthed } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await adminAuthed()) redirect("/admin/analytics");
  return <CommandLogin />;
}

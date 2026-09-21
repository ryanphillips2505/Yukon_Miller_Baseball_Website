import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Center",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#070708] text-[#f4f1ea] print:static print:overflow-visible">
      {children}
    </div>
  );
}

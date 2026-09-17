"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandLogo } from "@/components/brand-logo";
import { allNav, navMore, navPrimary, program } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <BrandLogo
            variant="mark"
            priority
            sizes="40px"
            className="size-10 w-10 shrink-0 rounded-sm object-cover"
            alt="Yukon Baseball"
          />
          <span className="min-w-0">
            <span className="font-heading block text-sm tracking-[0.18em] text-white uppercase">
              Yukon Baseball
            </span>
            <span className="block truncate text-[0.65rem] tracking-[0.16em] text-zinc-400 uppercase">
              Home of the Millers
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors",
                isActive(pathname, item.href)
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "hidden h-8 px-3 text-xs tracking-wide uppercase sm:inline-flex",
            )}
          >
            Email the staff
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "border-white/15 bg-transparent text-white hover:bg-white/10 lg:hidden",
              )}
              aria-label="Open menu"
            >
              <Menu />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(22rem,100%)] border-white/10 bg-zinc-950 text-white"
            >
              <SheetHeader>
                <SheetTitle className="font-heading tracking-wide text-white uppercase">
                  {program.name}
                </SheetTitle>
                <SheetDescription className="text-zinc-400">
                  Schedule, roster, news, and Home Run Club.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-6">
                {allNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm uppercase tracking-wide",
                      isActive(pathname, item.href)
                        ? "bg-red-700 text-white"
                        : "text-zinc-300 hover:bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden border-t border-white/5 lg:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-6 py-2">
          {navMore.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[0.7rem] tracking-[0.16em] uppercase transition-colors",
                isActive(pathname, item.href)
                  ? "text-red-400"
                  : "text-zinc-500 hover:text-zinc-200",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

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
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const tabClass = (active: boolean) =>
  cn(
    "relative inline-flex h-16 items-center px-3 text-[0.8rem] font-medium tracking-[0.14em] uppercase transition-colors",
    active ? "text-white" : "text-zinc-400 hover:text-white",
    active &&
      "after:absolute after:right-3 after:bottom-0 after:left-3 after:h-0.5 after:bg-[#c8102e]",
  );

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreActive = navMore.some((item) => isActive(pathname, item.href));

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <BrandLogo
            variant="mark"
            priority
            sizes="36px"
            className="size-9 w-9 shrink-0 rounded-sm object-cover"
            alt="Yukon Baseball"
          />
          <span className="font-heading text-sm tracking-[0.2em] text-white uppercase">
            Yukon Baseball
          </span>
        </Link>

        <nav className="hidden items-center lg:flex">
          {navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={tabClass(isActive(pathname, item.href))}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className={tabClass(moreActive || moreOpen)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((value) => !value)}
            >
              More
              <ChevronDown
                className={cn(
                  "ml-1 size-3.5 transition-transform",
                  moreOpen && "rotate-180",
                )}
              />
            </button>
            {moreOpen ? (
              <div
                role="menu"
                className="absolute top-full right-0 mt-0 min-w-52 border border-white/10 bg-zinc-950 py-2 shadow-2xl"
              >
                {navMore.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className={cn(
                      "block px-4 py-2.5 text-sm tracking-[0.12em] uppercase",
                      isActive(pathname, item.href)
                        ? "bg-white/8 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

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
                {program.classification} baseball
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pb-6">
              {allNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm tracking-wide uppercase",
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
    </header>
  );
}

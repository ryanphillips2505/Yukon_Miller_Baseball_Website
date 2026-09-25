import { BrandLogo } from "@/components/brand-logo";
import { NikeSwoosh } from "@/components/nike-swoosh";
import { nonprofit } from "@/lib/nonprofit";
import { allNav, program } from "@/lib/site";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex max-w-[22rem] flex-col items-center text-center">
          <BrandLogo
            variant="state"
            sizes="(max-width: 768px) 70vw, 352px"
            className="h-auto w-full"
            alt="Yukon Baseball"
          />
          <p className="mt-6 text-sm leading-6 text-zinc-300">
            Yukon High School Baseball.
          </p>
          <p className="text-sm leading-6 text-zinc-300">Home of the Millers.</p>
          <p className="mt-3 text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
            Miller Field, Yukon, Oklahoma.
          </p>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            Visit
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {program.street}
            <br />
            {program.cityStateZip}
          </p>
          <a
            href={program.mapsUrl}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300"
            target="_blank"
            rel="noreferrer"
          >
            Get directions
            <span aria-hidden>→</span>
          </a>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
              Contact
            </p>
            <a
              href={`mailto:${program.email}`}
              className="mt-3 block text-sm text-zinc-300 hover:text-white"
            >
              {program.email}
            </a>
            <p className="mt-4 text-[0.7rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
              On this site
            </p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {allNav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xs text-zinc-500 hover:text-zinc-200"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
          <div className="mt-10 flex items-center justify-center gap-4 md:mt-auto md:justify-end">
            <p className="text-right text-[0.58rem] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
              Built for a
              <br />
              bigger tomorrow.
            </p>
            <span className="h-7 w-px bg-white/25" aria-hidden />
            <NikeSwoosh size="footer" className="opacity-95" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/8 px-4 py-4 text-center text-xs leading-5 text-zinc-600">
        <p>Yukon High School Miller Baseball · {program.city}</p>
        <p className="mt-1.5 tracking-[0.12em] uppercase">{nonprofit.footerLegal}</p>
        <p className="mt-1">
          Official website of Yukon HS Home Run Club:{" "}
          <a
            href={nonprofit.websiteUrl}
            className="text-zinc-500 hover:text-zinc-300"
          >
            {nonprofit.websiteLabel}
          </a>
        </p>
      </div>
    </footer>
  );
}

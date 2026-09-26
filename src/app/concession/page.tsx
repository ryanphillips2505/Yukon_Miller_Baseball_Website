import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concession",
  robots: { index: false, follow: false },
};

type MenuItem = {
  name: string;
  price: string;
};

const mealDeal = {
  name: "Miller Meal Deal",
  price: "$8.00",
  detail: "Pick 1 — cheeseburger or 2 hot dogs. Includes a chip and a drink (soda or water).",
};

const sections: { title: string; items: MenuItem[] }[] = [
  {
    title: "A la carte",
    items: [
      { name: "Hamburger / Cheeseburger", price: "$6.00" },
      { name: "Hot Dog (w/ cheese)", price: "$3.00" },
      { name: "Nachos", price: "$4.00" },
      { name: "Pretzel w/ cheese", price: "$4.00" },
      { name: "Chicken sandwich", price: "$6.00" },
    ],
  },
  {
    title: "Snacks",
    items: [
      { name: "Popcorn", price: "$2.00" },
      { name: "Chips", price: "$1.00" },
      { name: "Pickle", price: "$1.00" },
    ],
  },
  {
    title: "Candy",
    items: [
      { name: "Ring Pop", price: "$3.00" },
      { name: "Airheads / Blow Pop", price: "2/$1.00" },
    ],
  },
  {
    title: "Drinks",
    items: [
      { name: "Gatorade", price: "$3.00" },
      { name: "Bottled water, soda", price: "$2.00" },
      { name: "Coffee, hot chocolate", price: "$1.00" },
    ],
  },
];

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="text-[0.95rem] tracking-wide text-zinc-800 uppercase">
        {item.name}
      </p>
      <p className="shrink-0 font-heading text-lg tracking-wide text-zinc-950">
        {item.price}
      </p>
    </div>
  );
}

export default function ConcessionPage() {
  return (
    <div className="bg-black">
      <div className="mx-auto w-[min(92vw,36rem)] px-0 py-8 sm:py-12">
        <article
          className={cn(
            "relative overflow-hidden rounded-sm bg-[#f4efe4] px-6 py-8 text-zinc-950",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:px-10 sm:py-10",
          )}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <BrandLogo
              variant="mark"
              alt=""
              sizes="280px"
              className="h-auto w-[70%] opacity-[0.07]"
            />
          </div>

          <header className="relative flex items-center justify-between gap-3">
            <BrandLogo variant="mark" alt="" sizes="40px" className="h-8 w-8" />
            <h1 className="font-heading text-center text-2xl tracking-[0.08em] text-zinc-950 uppercase sm:text-3xl">
              Miller Baseball Concession
            </h1>
            <BrandLogo variant="mark" alt="" sizes="40px" className="h-8 w-8" />
          </header>

          <section className="relative mt-8 border-t border-zinc-300/80 pt-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-heading text-xl tracking-wide uppercase">
                {mealDeal.name}
              </h2>
              <p className="font-heading text-xl tracking-wide">{mealDeal.price}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{mealDeal.detail}</p>
          </section>

          {sections.map((section) => (
            <section
              key={section.title}
              className="relative mt-7 border-t border-zinc-300/80 pt-5"
            >
              <h2 className="font-heading text-lg tracking-[0.18em] text-red-700 uppercase">
                {section.title}
              </h2>
              <div className="mt-3 space-y-2.5">
                {section.items.map((item) => (
                  <MenuRow key={item.name} item={item} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}

import { social } from "@/lib/site";
import { cn } from "@/lib/utils";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="none">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
      <path d="M14.2 21v-7.1h2.4l.4-2.8h-2.8V9.3c0-.8.2-1.4 1.4-1.4h1.5V5.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.8H8.4v2.8h2.6V21h3.2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
      <path d="M16.8 4h2.6l-5.7 6.5L20.4 20h-4.7l-3.7-4.8L7.4 20H4.8l6.1-7L3.8 4h4.8l3.3 4.4L16.8 4Zm-.9 14.4h1.4L8.2 5.5H6.7l9.2 12.9Z" />
    </svg>
  );
}

const icons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
};

export function SocialLinks({
  className,
  labeled = false,
}: {
  className?: string;
  labeled?: boolean;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {social.map((account) => {
        const Icon = icons[account.id];
        return (
          <li key={account.id}>
            <a
              href={account.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center text-zinc-400 transition-colors hover:text-white",
                labeled
                  ? "gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs tracking-[0.14em] uppercase hover:border-white/25"
                  : "size-9 justify-center rounded-lg border border-white/10 hover:border-white/25",
              )}
              aria-label={`${account.label} (opens in a new tab)`}
            >
              <Icon />
              {labeled ? account.label : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

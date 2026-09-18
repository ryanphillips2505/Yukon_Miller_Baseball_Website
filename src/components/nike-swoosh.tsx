import { cn } from "@/lib/utils";

type NikeSwooshProps = {
  className?: string;
};

export function NikeSwoosh({ className }: NikeSwooshProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1275 445"
      fill="currentColor"
      className={cn("block shrink-0 overflow-visible", className)}
      role="img"
      aria-label="Nike"
    >
      <path d="M35.6 444.8s575.3-203.1 1131.4-240.9c0 0-287.4 27.3-430.2 132.4 0 0-38.5 27.8-81.6 52.8 0 0 236.4-87.3 511.8-98.2L1275 0S687.7 434.1 35.6 444.8z" />
    </svg>
  );
}

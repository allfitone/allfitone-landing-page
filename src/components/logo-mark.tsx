import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span className={cn("brand-mark", className)} aria-hidden="true">
      <svg viewBox="0 0 405 1149" role="presentation" focusable="false">
        <path fill="currentColor" d="M405 0 0 211l120 1L11 1149l324-490L405 0Z" />
      </svg>
    </span>
  );
}

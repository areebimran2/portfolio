import { cn } from "@/lib/utils";

type SeparatorProps = {
  className?: string;
  decorative?: boolean;
};

export function Separator({
  className,
  decorative = true,
}: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      aria-orientation="horizontal"
      className={cn("h-px w-full shrink-0 bg-border", className)}
    />
  );
}

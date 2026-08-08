import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  nameClassName?: string;
  size?: number;
  showName?: boolean;
  name: string;
  priority?: boolean;
};

export function BrandMark({
  className,
  nameClassName,
  size = 36,
  showName = true,
  name,
  priority = false,
}: BrandMarkProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 leading-none", className)}
    >
      <Image
        src="/brand/logo-flor.svg"
        alt=""
        width={size}
        height={size}
        className="block shrink-0 overflow-hidden rounded-full object-cover"
        style={{ width: size, height: size }}
        priority={priority}
        sizes={`${size}px`}
        unoptimized
      />
      {showName ? (
        <span
          className={cn(
            "font-display text-lg leading-none font-semibold tracking-tight md:text-xl",
            nameClassName,
          )}
        >
          {name}
        </span>
      ) : null}
    </span>
  );
}

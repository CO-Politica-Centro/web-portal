import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "href"
> & {
  href: string;
  children: ReactNode;
  className?: string;
  /** When false, skip the screen-reader new-tab hint (e.g. mailto). Default true. */
  announceNewTab?: boolean;
};

/**
 * Anchor that opens in a new tab with noopener and an accessible new-tab hint.
 */
export function ExternalLink({
  href,
  children,
  className,
  announceNewTab = true,
  ...rest
}: ExternalLinkProps) {
  const isMail = href.startsWith("mailto:");

  if (isMail) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      {...rest}
    >
      {children}
      {announceNewTab ? (
        <span className="sr-only"> (se abre en una nueva pestaña)</span>
      ) : null}
    </a>
  );
}

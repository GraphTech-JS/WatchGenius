"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface LocalizedLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export function LocalizedLink({
  href,
  children,
  className,
  ...rest
}: LocalizedLinkProps) {
  const pathname = usePathname();

  const currentLocale = pathname?.split("/")[1] || "ua";

  const localizedHref =
    typeof href === "string" && !href.startsWith(`/${currentLocale}`)
      ? `/${currentLocale}${href.startsWith("/") ? href : `/${href}`}`
      : href;

  return (
    <Link href={localizedHref} className={className} {...rest}>
      {children}
    </Link>
  );
}

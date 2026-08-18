"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { liveNav } from "@/lib/site";

/** Home first, then whatever `site.nav` has marked live. */
const ITEMS = [{ href: "/", label: "Home" }, ...liveNav];

/** `/cv/` and `/cv` are the same page — trailingSlash decides which we get. */
const norm = (path: string) => path.replace(/\/+$/, "") || "/";

/**
 * Primary navigation. The current page is the one full-strength item and
 * carries `aria-current`, so the header states where you are rather than
 * relying on a wordmark that goes nowhere.
 */
export function SiteNav() {
  const here = norm(usePathname() ?? "/");

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        {ITEMS.map((item) => {
          const current = norm(item.href) === here;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`t-meta ${current ? "" : "t-on-mut"}`}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...pops
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes: { href: string; label: string; active: boolean }[] = [
    {
      href: `/${params.warehouseId}/`,
      label: "Inventory",
      active: pathname === `/${params.warehouseId}`,
    },
    {
      href: `/${params.warehouseId}/purchase-orders`,
      label: "Purchase Orders",
      active: pathname === `/${params.warehouseId}/purchase-orders`,
    },
    {
      href: `/${params.warehouseId}/settings`,
      label: "Settings",
      active: pathname === `/${params.warehouseId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

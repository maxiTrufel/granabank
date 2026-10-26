"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HomeIcon, ListIcon, LogoutIcon, SpinnerIcon } from "@/components/ui/icons";
import { apiFetch } from "@/lib/api-client";

const LINKS = [
  { href: "/home", label: "Inicio", icon: HomeIcon },
  { href: "/movimientos", label: "Movimientos", icon: ListIcon },
];

const itemClass = "flex size-12 items-center justify-center rounded-xl transition-colors hover:bg-surface";

export function BottomNav() {
  return <BottomNavBar pathname={usePathname()} />;
}

/**
 * La barra recibe el pathname por props para poder renderizarla sin estado
 * activo como fallback de Suspense mientras se resuelve la URL en el cliente.
 */
export function BottomNavBar({ pathname }: { pathname: string | null }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 z-10 flex items-center justify-around rounded-t-3xl bg-white px-6 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 shadow-[0_-4px_24px_rgb(45_45_58/0.06)]"
    >
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || Boolean(pathname?.startsWith(`${href}/`));
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`${itemClass} ${active ? "text-granate" : "text-ink"}`}
          >
            <Icon className="size-6" />
          </Link>
        );
      })}
      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        aria-label="Cerrar sesión"
        className={`${itemClass} text-ink disabled:opacity-60`}
      >
        {loggingOut ? <SpinnerIcon className="size-6 animate-spin" /> : <LogoutIcon className="size-6" />}
      </button>
    </nav>
  );
}

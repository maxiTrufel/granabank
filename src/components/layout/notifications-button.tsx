"use client";

import { useEffect, useRef, useState } from "react";
import { BellIcon } from "@/components/ui/icons";

export function NotificationsButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Notificaciones"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-white"
      >
        <BellIcon className="size-5" />
      </button>
      {open && (
        <div
          role="status"
          className="absolute right-0 top-11 z-20 w-56 rounded-2xl bg-white p-4 text-sm shadow-soft ring-1 ring-line"
        >
          <p className="font-medium">Estás al día</p>
          <p className="mt-1 text-xs text-muted">No tenés notificaciones nuevas.</p>
        </div>
      )}
    </div>
  );
}

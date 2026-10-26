import { Suspense } from "react";
import { BottomNav, BottomNavBar } from "@/components/layout/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex flex-1 flex-col px-6 pb-8">{children}</main>
      <Suspense fallback={<BottomNavBar pathname={null} />}>
        <BottomNav />
      </Suspense>
    </>
  );
}

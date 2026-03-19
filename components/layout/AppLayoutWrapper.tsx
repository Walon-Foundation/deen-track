"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Dashboard handles its own UI structure with its sidebar/header for that "Pro" feel.
  // Everywhere else used the shared global navbar/footer.
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <div className={!isDashboard ? "pt-0" : ""}>{children}</div>
      {!isDashboard && <Footer />}
    </>
  );
}

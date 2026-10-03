"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    // The brand uses one light theme with navy bands (see globals.css), so
    // component dark-mode variants must stay off.
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

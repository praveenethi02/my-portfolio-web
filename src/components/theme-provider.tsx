"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Thin wrapper so the rest of the app imports the provider from our own components folder
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

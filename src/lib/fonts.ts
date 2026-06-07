import { Geist, Geist_Mono } from "next/font/google";

/**
 * Font configuration for Phase 5 layout shell.
 * CSS variables are consumed by design tokens in globals.css.
 */
export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;

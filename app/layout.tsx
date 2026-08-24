import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link Registry | Bookchaowalit",
  description: "A local-only URL shortening demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Lab | Allfit One",
  robots: { index: false, follow: false },
};

export default function DevLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

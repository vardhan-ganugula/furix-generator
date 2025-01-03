import type { Metadata } from "next";
import Header from "@/components/reusable/Header";
import Footer from "@/components/reusable/Footer";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Mewtron",
  description: "the best ai content generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Toaster />
      <main>{children}</main>
      <Footer />
    </>
  );
}

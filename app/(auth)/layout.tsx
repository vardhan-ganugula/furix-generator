// 'use client'
import type { Metadata } from "next";
import Header from "@/components/reusable/Header";
import Footer from "@/components/reusable/Footer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
      <main>
        <section className="font-poppins flex flex-col items-center justify-center h-[91vh] md:h-[89.45vh] w-full inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] md:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
          <Suspense fallback={ <Skeleton className="w-1/2 h-1/2" /> }>
            {children}
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}

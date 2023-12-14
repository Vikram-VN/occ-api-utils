import React from "react";
import { StoreProvider } from "@/store";
import Footer from "@/components/footer";
import ThemeToggle from "@/theme/toggle";
import OccUtilsApp from "@/app";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import "@/theme/globals.css";

export const metadata = {
  title: "OCC API Utils",
  description: "Some useful tools for OCC",
};

const Header = dynamic(() => import("@/components/header"), {
  ssr: false,
});

const SideBar = dynamic(() => import("@/components/navbar"), {
  ssr: false,
});


export default function RootLayout(props) {
  const theme = cookies().get("occTheme")?.value;

  return (
    <StoreProvider>
      <html lang="en" className={theme}>
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/media/favicon.svg" sizes="32x32" />
          <link rel="icon" href="/media/favicon.svg" sizes="192x192" />
          <link rel="apple-touch-icon" href="/media/favicon.svg" />
          <meta name="occ-logo" content="/media/favicon.svg" />
        </head>
        <body
          className={`bg-white text-black dark:bg-slate-900 dark:text-white`}
          suppressHydrationWarning={true}
        >
          <Header>
            <ThemeToggle />
          </Header>
          <main className="flex">
            <SideBar />
            <section className="w-full px-6 pt-2 relative pb-6">
              <OccUtilsApp {...props} />
            </section>
          </main>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}

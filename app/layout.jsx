import React from "react";
import { StoreProvider } from "@/store";
import { Header, Footer, NavBar } from "@/components";
import ThemeToggle from "@/theme/toggle";
import OCCUtilsApp from "@/app";
import { cookies } from "next/headers";
import "@/theme/globals.css";

export const metadata = {
  title: "OCC API Utils",
  description: "Some useful tools for OCC",
};

export default function RootLayout(props) {
  const theme = cookies().get("occTheme")?.value;

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/media/favicon.svg" sizes="32x32" />
        <link rel="icon" href="/media/favicon.svg" sizes="192x192" />
        <link rel="apple-touch-icon" href="/media/favicon.svg" />
        <meta name="occ-logo" content="/media/favicon.svg" />
      </head>
      <body
        className={`bg-white text-black dark:bg-slate-900 dark:text-white`}
        suppressHydrationWarning={true}
      >
        <StoreProvider>
          <Header>
            <ThemeToggle />
          </Header>
          <main className="flex">
            <NavBar />
            <section className="w-full px-6 pt-2 relative pb-6">
              <OCCUtilsApp {...props} />
            </section>
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

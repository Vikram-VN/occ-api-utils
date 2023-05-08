import React from "react";
import { Inter } from 'next/font/google';
import { StoreProvider } from "./store/storeProvider";
import OccUtilsApp from "./app";
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OCC API Utils',
  description: 'Some useful tools for OCC',
}

export default function RootLayout(props) {

  const { children } = props;

  return (
    <StoreProvider>
      <OccUtilsApp>{children}</OccUtilsApp>
    </StoreProvider>
  )
}
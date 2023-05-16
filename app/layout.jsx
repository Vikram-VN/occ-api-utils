import React from "react";
import { StoreProvider } from "./store/storeProvider";
import OccUtilsApp from "./app";
import './globals.css';

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
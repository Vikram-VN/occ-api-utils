import React from "react";
import { StoreProvider } from "./store/storeProvider";
import App from "./app";

export const metadata = {
  title: 'OCC API Utils',
  description: 'Some useful tools for OCC',
}

export default function RootLayout(props) {

  const { children } = props;

  return (
    <StoreProvider>
      <App>{children}</App>
    </StoreProvider>
  )
}
import React from "react";
import { StoreProvider } from "./store/storeProvider";
<<<<<<< HEAD
import OccUtilsApp from "./app";
import './globals.css';

const inter = Inter({ subsets: ['latin'] })
=======
import App from "./app";
>>>>>>> bc0c775 (added example redux for login)

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
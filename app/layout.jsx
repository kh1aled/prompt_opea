"use client";
import "@styles/global.css";
import Nav from "@components/Nav";
import { SessionProvider } from "next-auth/react";



const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Nav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;

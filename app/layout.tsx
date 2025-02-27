"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../store/store";
import type React from "react"; // Added import for React


import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          <div>
            <Navbar />
          </div>
          {children}
        </body>
      </Provider>
    </html>
  );
}

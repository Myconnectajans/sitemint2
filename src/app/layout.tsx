import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import LiveChatButton from "@/components/LiveChatButton";

export const metadata: Metadata = {
  title: "SiteMint",
  description: "Auth-aware navbar + falling squares demo",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <CartProvider>
          <Navbar />
          
            {children}
          
          <LiveChatButton />
        </CartProvider>
    </body>
    </html>
  );
}

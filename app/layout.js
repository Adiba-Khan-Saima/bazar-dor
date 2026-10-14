import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "প্রয়োজনীয় নিত্যপণ্যের বাজারদর সহজে দেখুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={hindSiliguri.variable}>
        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#1d271f",
              border: "1px solid #e1e8e1",
            },
            success: {
              iconTheme: {
                primary: "#05893e",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#d03739",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
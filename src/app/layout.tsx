import { Inter } from "next/font/google";
import "./globals.css";
import CustomNavbar from "./components/CustomNavbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from "@/context/userProvider";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ToastContainer />
          <CustomNavbar />
          <div className="mt-2">{children}</div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}

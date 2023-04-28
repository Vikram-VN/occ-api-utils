import { Inter, Preahvihear } from 'next/font/google';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import 'flowbite';
import './globals.css';
import SideBar from './components/navbar/sideBar';
import PreviousTheme from './components/header/components/theme/previousTheme';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OCC API Utils',
  description: 'Some useful tools for OCC',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <section className="flex flex-col h-screen">
            <Header />
            <section className="flex">
              <SideBar />
              <section className="p-10">{children}</section>
            </section>
            <Footer />
          </section>
        </body>
    </html>
  )
}

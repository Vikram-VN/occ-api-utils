import { Inter } from 'next/font/google';
import Footer from './components/footer';
import Header from './components/header';
import './globals.css';

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
          {children}
          <Footer />
        </section>
      </body>
    </html>
  )
}

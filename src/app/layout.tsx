import './globals.css'
import type { Metadata } from 'next'

import { Inter, Montserrat} from 'next/font/google'
import { Toaster } from "@/components/ui/toaster";


const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Dating | Shipp',
  description: 'Skip the small talk and meet someone IRL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

'use client'
import '../globals.css'
import 'tailwindcss/tailwind.css'
import { Krona_One } from '@next/font/google'
import { AuthContextProvider } from '@/context/AuthContext'

const krona = Krona_One({
  subsets: ['latin'],
  weight: '400',
})

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en" className={krona.className}>
      <head />
      <body>
      <div className="bg-gray-100 min-h-screen">
        <title>My Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <nav className="flex justify-between items-center bg-gray-900 px-4 py-2">
        <a href="#" className="text-lg font-bold">
          My App
        </a>
        <button className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      <main className="p-4">      
        <AuthContextProvider>{children}</AuthContextProvider>
</main>    </div>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Code Craft AI - AI Code Snippets Marketplace',
  description: 'Premium code templates, boilerplates, and snippets for developers. Instant digital delivery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">CodeCraft AI</h1>
            <div className="space-x-4">
              <Link href="/" className="text-gray-700 hover:text-indigo-600">Gallery</Link>
              <Link href="/admin" className="text-gray-700 hover:text-indigo-600">Admin</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="border-t border-gray-200 bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm">
            <p>&copy; 2026 Code Craft AI. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

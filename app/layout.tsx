import './globals.css'
import type { Metadata } from 'next'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Gift - For Mummy ❤️",
  description: 'A special interactive Valentine\'s Day gift website created with love.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={pacifico.className}>
        <div className="floating-hearts" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 10}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        {children}
      </body>
    </html>
  )
} 
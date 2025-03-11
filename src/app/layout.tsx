import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Jayson Dasher | Portfolio',
    description: 'Personal portfolio website of Jayson Dasher',
    icons: {
        icon: '/favicon.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
} 
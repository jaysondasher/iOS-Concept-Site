/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['i.imgur.com', 'github.com'],
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig 
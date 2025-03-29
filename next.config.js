/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['i.imgur.com', 'github.com', 'picsum.photos'],
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
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig 
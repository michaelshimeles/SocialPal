/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '"utfs.io"',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '"uploadthing.com"',
                port: '',
                pathname: '/**'
            },
        ],

    }
}

module.exports = nextConfig

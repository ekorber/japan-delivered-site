/** @type {import('next').NextConfig} */
const nextConfig = {
    webp: {
        preset: "default",
        quality: 100,
    },
    images: {
        domains: ["japan-delivered-product-image-bucket.s3.us-east-1.amazonaws.com"]
    },
}

module.exports = nextConfig

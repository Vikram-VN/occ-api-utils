/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    }
  }
   
  const withMDX = require('@next/mdx')();
  module.exports = withMDX(nextConfig)
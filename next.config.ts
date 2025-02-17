import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/',
                destination: '/characters',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;

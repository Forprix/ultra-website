/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // async rewrites() {
    //     return [
    //         {
    //             source: '/graphql',
    //             destination: 'http://localhost:3001/graphql',
    //         },
    //         {
    //             source: '/sql',
    //             destination: 'http://localhost:3001/sql',
    //         },
    //     ]
    // }
};

export default nextConfig;

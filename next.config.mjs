/** @type {import('next').NextConfig} */

const nextConfig = {
  // 通过next.config.mjs文件添加ppr选项为您的 Next.js 应用程序启用 PPR部分预渲染
  // 'incremental'值允许您对特定路由采用 PPR。
  experimental: {
    ppr: 'incremental'
  }
};

export default nextConfig;

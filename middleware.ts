import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// 将authConfig对象导入到中间件文件中。在项目的根目录中，创建一个名为middleware.ts的文件
// 在这里，您使用authConfig对象初始化 NextAuth.js 并导出auth属性。您还使用中间件中的matcher选项来指定它应该在特定路径上运行。
// 使用中间件执行此任务的优点是，在中间件验证身份验证之前，受保护的路由甚至不会开始渲染，从而增强应用程序的安全性和性能。
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;


// 添加页面选项
// 在项目的根目录创建一个auth.config.ts文件，导出authConfig对象。该对象将包含 NextAuth.js 的配置选项。目前，它仅包含pages选项：
// 您可以使用pages选项指定自定义登录、注销和错误页面的路由。
// 这不是必需的，但通过在我们的pages选项中添加signIn: '/login' ，用户将被重定向到我们的自定义登录页面，而不是 NextAuth.js 默认页面。

// authorized回调用于验证请求是否有权通过Next.js Middleware访问页面。它在请求完成之前调用，并接收具有auth和request属性的对象。 auth属性包含用户的会话， request属性包含传入的请求。
// providers选项是一个数组，您可以在其中列出不同的登录选项。目前，它是一个空数组以满足 NextAuth 配置。您将在添加凭据提供程序部分了解更多相关信息。
import SideNav from '@/app/ui/dashboard/sidenav';

// 您可能在开发中看不到应用程序的差异，但您应该注意到生产中的性能改进。 Next.js 将预渲染路由的静态部分，并推迟动态部分，直到用户请求它们。
// 部分预渲染的优点在于您无需更改代码即可使用它。只要您使用 Suspense 包装路线的动态部分，Next.js 就会知道路线的哪些部分是静态的，哪些部分是动态的。
// 我们相信 PPR 有潜力成为 Web 应用程序的默认渲染模型，汇集了静态站点和动态渲染的优点。然而，它仍处于实验阶段。我们希望将来能够稳定它，并使其成为 Next.js 构建的默认方式。
export const experimental_ppr = true;
 
// <Layout />组件接收一个children属性。该子项可以是页面或其他布局。在您的情况下， /dashboard内的页面将自动嵌套在<Layout />内，如下所示：
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
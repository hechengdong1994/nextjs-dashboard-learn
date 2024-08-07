import DashboardSkeleton from "../../ui/skeletons";

const Loading = () => {
  // return <div>Loading...</div>;
  return <DashboardSkeleton />;
}

export default Loading;

// loading.tsx是一个基于 Suspense 构建的特殊 Next.js 文件，它允许您创建fallback UI 以在页面内容加载时显示为替换。
// 由于<SideNav>是静态的，因此会立即显示。加载动态内容时，用户可以与<SideNav>交互。
// 用户不必等待页面完成加载就可以离开（这称为可中断导航）。

// 加载骨架是 UI 的简化版本。
// 许多网站使用它们作为占位符（或fallback）来向用户指示内容正在加载。
// 您在loading.tsx中添加的任何UI都将作为静态文件的一部分嵌入，并首先发送。
// 然后，其余的动态内容将从服务器流式传输到客户端。
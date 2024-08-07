## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

为什么要优化字体？
字体在网站设计中发挥着重要作用，但如果需要获取和加载字体文件，在项目中使用自定义字体可能会影响性能。
Cumulative Layout Shift累积布局偏移是 Google 用于评估网站性能和用户体验的指标。对于字体，当浏览器最初以后备字体或系统字体呈现文本，然后在加载后将其交换为自定义字体时，就会发生布局转换。这种交换可能会导致文本大小、间距或布局发生变化，从而移动其周围的元素。
当您使用next/font模块时，Next.js 会自动优化应用程序中的字体。它在构建时下载字体文件并将它们与其他静态资产一起托管。这意味着当用户访问您的应用程序时，不会出现会影响性能的额外网络请求字体。


为什么要优化图像？
Next.js 可以在顶级/public文件夹下提供静态资源，例如图像。 /public内的文件可以在您的应用程序中引用。

使用常规 HTML，您可以添加图像，如下所示：
<img
  src="/hero.png"
  alt="Screenshots of the dashboard project showing desktop version"
/>
但是，这意味着您必须手动：
确保您的图像在不同的屏幕尺寸上都能响应。
指定不同设备的图像尺寸。
防止图像加载时布局发生变化。
延迟加载用户视口之外的图像。
图像优化是 Web 开发中的一个大主题，其本身可以被视为一个专业领域。您可以使用next/image组件自动优化图像，而不是手动实现这些优化。

<Image>组件
<Image>组件是 HTML <img>标记的扩展，并具有自动图像优化功能，例如：
加载图像时自动防止布局移动。
调整图像大小以避免将大图像传送到具有较小视口的设备。
默认情况下延迟加载图像（图像在进入视口时加载）。
以现代格式（例如WebP）提供图像和AVIF ，当浏览器支持时。


Nested routing嵌套路由
Next.js 使用文件系统路由，其中​​文件夹用于创建嵌套路由。每个文件夹代表一个映射到URL 段的路由段。
您可以使用layout.tsx和page.tsx文件为每个路由创建单独的UI。
page.tsx是一个特殊的 Next.js 文件，它导出 React 组件，并且需要它才能访问路由。在您的应用程序中，您已经有一个页面文件： /app/page.tsx - 这是与路由'/'关联的主页。
要创建嵌套路由，您可以将文件夹相互嵌套并在其中添加page.tsx文件。例如：
app
|-page.tsx-->route /
|-dashboard
  |-page.tsx-->route /dashboard
/app/dashboard/page.tsx与/dashboard路径关联。

可以通过以下方式在Next.js中创建不同的页面：使用文件夹创建新的路由段，并在其中添加page文件。
通过为page文件指定一个特殊名称，Next.js允许您将UI组件、测试文件和其他相关代码与您的路由并置。只有page文件内的内容可以公开访问。例如， /ui和/lib文件夹与您的路由一起位于/app文件夹内。


创建仪表板布局
仪表板具有某种跨多个页面共享的导航。在 Next.js 中，您可以使用特殊的layout.tsx文件来创建在多个页面之间共享的 UI。让我们为仪表板页面创建一个布局！
<Layout />组件接收一个children属性。该子项可以是页面或其他布局。在您的情况下， /dashboard内的页面将自动嵌套在<Layout />内
在 Next.js 中使用布局的好处之一是，在导航时，只有页面组件会更新，而布局不会重新呈现。这称为部分渲染


Root layout 根布局
/app/layout.tsx
这称为根布局并且是必需的。您添加到根布局的任何 UI 将在应用程序中的所有页面之间共享。
您可以使用根布局来修改<html>和<body>标记，并添加元数据（您将在后面的章节中了解有关元数据的更多信息）。
由于您刚刚创建的新布局 ( /app/dashboard/layout.tsx ) 对于仪表板页面而言是唯一的，因此您无需向根布局添加任何 UI。


为什么要优化导航navigation？
要在页面之间进行链接，传统上您会使用<a> HTML 元素。目前，侧边栏链接使用<a>元素，但请注意当您在浏览器上的主页、发票和客户页面之间导航时会发生什么。
每个页面导航都有全页面刷新！

<Link>组件
在 Next.js 中，您可以使用<Link />组件在应用程序中的页面之间进行链接。 <Link>允许您使用 JavaScript 进行客户端导航。

自动代码分割和预取
为了改善导航体验，Next.js 自动按路线段对应用程序进行代码分割。这与传统的 React SPA不同（浏览器在初始加载时加载所有应用程序代码）。
按路由拆分代码意味着页面变得孤立。如果某个页面抛出错误，应用程序的其余部分仍然可以工作。
此外，在生产中，只要<Link>组件出现在浏览器视口中，Next.js 就会自动在后台预取链接路由的代码。当用户单击链接时，目标页面的代码将已经在后台加载，这使得页面转换几乎是即时的！


模式：显示活动链接
常见的 UI 模式是显示活动链接以向用户指示他们当前所在的页面。为此，您需要从 URL 获取用户的当前路径。 Next.js 提供了一个名为usePathname()的钩子，您可以使用它来检查路径并实现此模式。
由于usePathname()是一个钩子，您需要将nav-links.tsx转换为客户端组件。将 React 的"use client"指令添加到文件顶部，然后从next/navigation导入usePathname() 
接下来，将路径分配给<NavLinks />组件内名为pathname的变量
您可以使用CSS 样式一章中介绍的clsx库在链接处于活动状态时有条件地应用类名。当link.href与pathname匹配时，链接应以蓝色文本和浅蓝色背景显示。


API层
API 是应用程序代码和数据库之间的中间层。在某些情况下您可能会使用 API：
如果您使用提供 API 的第三方服务。
如果您从客户端获取数据，则需要有一个在服务器上运行的 API 层，以避免将数据库机密暴露给客户端。
在 Next.js 中，您可以使用Route Handlers创建 API 端点。

数据库查询
当您创建全栈应用程序时，您还需要编写与数据库交互的逻辑。对于关系数据库与 Postgres 一样，您可以使用 SQL 或ORM来完成此操作。
在某些情况下，您必须编写数据库查询：
创建 API 端点时，您需要编写与数据库交互的逻辑。
如果您使用 React Server Components（在服务器上获取数据），您可以跳过 API 层，直接查询数据库，而不必冒将数据库机密暴露给客户端的风险。

使用服务器组件获取数据
默认情况下，Next.js 应用程序使用React Server Components 。使用服务器组件获取数据是一种相对较新的方法，使用它们有一些好处：
服务器组件支持 Promise，为数据获取等异步任务提供更简单的解决方案。您可以使用async/await语法，而无需使用useEffect 、 useState或数据获取库。
服务器组件在服务器上执行，因此您可以将昂贵的数据获取和逻辑保留在服务器上，并且仅将结果发送到客户端。
如前所述，由于服务器组件在服务器上执行，因此您可以直接查询数据库，而无需额外的 API 层。

什么是请求瀑布？
“瀑布”是指依赖于先前请求的完成的网络请求序列。在获取数据的情况下，每个请求只有在前一个请求返回数据后才能开始。
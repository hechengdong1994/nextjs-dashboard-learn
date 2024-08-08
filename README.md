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


什么是静态渲染？
通过静态渲染，数据获取和渲染发生在构建时（部署时）或重新验证数据时在服务器上。
每当用户访问您的应用程序时，就会提供缓存的结果。静态渲染有几个好处：
更快的网站- 预渲染的内容可以缓存并在全球范围内分发。这可以确保世界各地的用户可以更快、更可靠地访问您网站的内容。
减少服务器负载- 由于内容被缓存，您的服务器不必为每个用户请求动态生成内容。
SEO - 预渲染的内容更容易让搜索引擎爬虫索引，因为内容在页面加载时就已经可用。这可以提高搜索引擎排名。
静态渲染对于没有数据或在用户之间共享数据的UI 非常有用，例如静态博客文章或产品页面。它可能不太适合具有定期更新的个性化数据的仪表板。

什么是动态渲染？
通过动态呈现，内容会在请求时（当用户访问页面时）在服务器上为每个用户呈现。动态渲染有几个好处：
实时数据- 动态渲染允许您的应用程序显示实时或经常更新的数据。这对于数据经常变化的应用程序来说是理想的选择。
用户特定的内容- 更容易提供个性化内容（例如仪表板或用户配置文件），并根据用户交互更新数据。
请求时间信息- 动态呈现允许您访问只能在请求时知道的信息，例如 cookie 或 URL 搜索参数。
通过动态渲染，您的应用程序的速度取决于最慢的数据获取速度。


什么是流媒体？
流式传输是一种数据传输技术，允许您将路由分解为更小的“块”，并在准备就绪时将它们逐步从服务器流式传输到客户端。
通过流式传输，您可以防止缓慢的数据请求阻塞整个页面。这允许用户查看页面的部分内容并与之交互，而无需等待所有数据加载后再向用户显示任何 UI。
流式处理与 React 的组件模型配合得很好，因为每个组件都可以被视为一个块。
在 Next.js 中实现流式传输有两种方法：
在页面级别，使用loading.tsx文件。
对于特定组件，使用<Suspense> 。


修复路线组的加载骨架错误
由于在文件系统中， loading.tsx的级别高于/invoices/page.tsx和/customers/page.tsx ，因此它也适用于这些页面。
我们可以通过路由组来改变这一点。在dashboard文件夹内创建一个名为/(overview)的新文件夹。然后，将loading.tsx和page.tsx文件移至文件夹内：
现在， loading.tsx文件将仅适用于您的仪表板概述页面。
路由组允许您将文件组织到逻辑组中，而不影响 URL 路径结构。当您使用括号()创建新文件夹时，该名称不会包含在 URL 路径中。因此/dashboard/(overview)/page.tsx变为/dashboard 。
在这里，您使用路由组来确保loading.tsx仅适用于您的dashboard概述页面。但是，您还可以使用路线组将您的应用程序分成几个部分（例如(marketing)路线和(shop)路线）或按团队划分较大的应用程序。


流式传输组件
到目前为止，您正在流式传输整个页面。但您也可以使用 React Suspense 更细化并流式传输特定组件。
Suspense 允许您推迟应用程序的渲染部分，直到满足某些条件（例如加载数据）。您可以将动态组件包装在 Suspense 中。然后，向其传递一个后备组件以在动态组件加载时显示。
如果您还记得缓慢的数据请求fetchRevenue() ，那么这个请求就会减慢整个页面的速度。您可以使用 Suspense 仅流式传输此组件并立即显示页面 UI 的其余部分，而不是阻止整个页面。
从 React 导入<Suspense> ，并将其包装在<RevenueChart />周围。您可以向其传递一个名为<RevenueChartSkeleton>的后备组件。


决定在哪里放置你的悬念边界Suspense boundaries
悬念边界的放置位置取决于以下几个因素：
您希望用户在流式传输页面时如何体验页面。
您想要优先考虑哪些内容。
如果组件依赖于数据获取。
看看您的仪表板页面，您是否会采取不同的做法？
不用担心。没有正确的答案。
您可以像我们对loading.tsx所做的那样流式传输整个页面...但如果其中一个组件的数据获取速度较慢，则可能会导致加载时间更长。
您可以单独流式传输每个组件...但这可能会导致 UI 在准备就绪时弹出到屏幕上。
您还可以通过流式传输页面部分来创建交错效果。但您需要创建包装器组件。
您放置悬念边界的位置将根据您的应用程序而有所不同。一般来说，最好将数据获取移至需要它的组件，然后将这些组件包装在 Suspense 中。但是，如果您的应用程序需要流式传输部分或整个页面，则没有任何问题。
不要害怕尝试 Suspense 并看看什么最有效，它是一个强大的 API，可以帮助您创建更愉快的用户体验。


静态与动态路由
对于当今构建的大多数 Web 应用程序，您可以为整个应用程序或特定路线选择静态和动态渲染。在 Next.js 中，如果您在路由中调用动态函数（例如查询数据库），则整个路由将变为动态。
然而，大多数路由并不是完全静态或动态的。例如，考虑一个电子商务网站。您可能希望静态呈现大部分产品信息页面，但您可能希望动态获取用户的购物车和推荐产品，这使您可以向用户显示个性化内容。


什么是部分预渲染？
Next.js 14 引入了部分预渲染的实验版本 - 一种新的渲染模型，允许您在同一路径中结合静态和动态渲染的优点。例如：
当用户访问某条路线route时：
提供包含导航栏和产品信息的静态路由 shell，确保快速初始加载。
shell 留下了一些孔，动态内容（例如购物车和推荐产品）将异步加载。
异步孔并行传输，减少了页面的整体加载时间。


部分预渲染如何工作？
部分预渲染使用 React 的Suspense （您在上一章中了解到）推迟应用程序的渲染部分，直到满足某些条件（例如加载数据）。
Suspense 回退与静态内容一起嵌入到初始 HTML 文件中。在构建时（或重新验证期间），静态内容被预渲染以创建静态 shell。动态内容的呈现被推迟，直到用户请求路线。
将组件包装在 Suspense 中并不会使组件本身变得动态，而是 Suspense 被用作静态和动态代码之间的边界。

实施部分预渲染
通过next.config.mjs文件添加ppr选项为您的 Next.js 应用程序启用 PPR
'incremental'值允许您对特定路由采用 PPR。
接下来，将experimental_ppr分段配置选项添加到仪表板布局中：
就是这样。您可能在开发中看不到应用程序的差异，但您应该注意到生产中的性能改进。 Next.js 将预渲染路由的静态部分，并推迟动态部分，直到用户请求它们。
部分预渲染的优点在于您无需更改代码即可使用它。只要您使用 Suspense 包装路线的动态部分，Next.js 就会知道路线的哪些部分是静态的，哪些部分是动态的。
我们相信 PPR 有潜力成为 Web 应用程序的默认渲染模型，汇集了静态站点和动态渲染的优点。然而，它仍处于实验阶段。我们希望将来能够稳定它，并使其成为 Next.js 构建的默认方式。


概括
回顾一下，您已经做了一些事情来优化应用程序中的数据获取：
在与应用程序代码相同的区域中创建数据库，以减少服务器和数据库之间的延迟。
使用 React Server 组件在服务器上获取数据。这使您可以在服务器上保留昂贵的数据获取和逻辑，减少客户端 JavaScript 捆绑，并防止数据库机密暴露给客户端。
使用 SQL 仅获取所需的数据，减少了每个请求传输的数据量以及转换内存中数据所需的 JavaScript 量。
使用 JavaScript 并行化数据获取 - 在有意义的情况下这样做。
实现了流式处理，以防止缓慢的数据请求阻塞整个页面，并允许用户开始与 UI 交互，而无需等待所有内容加载。
将数据获取移至需要它的组件，从而隔离路由的哪些部分应该是动态的。



为什么使用 URL 搜索参数？
如上所述，您将使用 URL 搜索参数来管理搜索状态。如果您习惯于使用客户端状态来执行此操作，则此模式可能是新的。
使用 URL 参数实现搜索有几个好处：
可添加书签和可共享的 URL ：由于搜索参数位于 URL 中，因此用户可以为应用程序的当前状态（包括其搜索查询和过滤器）添加书签，以供将来参考或共享。
服务器端渲染和初始加载：可以在服务器上直接使用URL参数来渲染初始状态，从而更容易处理服务器渲染。
分析和跟踪：直接在 URL 中进行搜索查询和过滤器可以更轻松地跟踪用户行为，而无需额外的客户端逻辑。


何时使用useSearchParams()钩子与searchParams属性？
您可能已经注意到您使用了两种不同的方法来提取搜索参数。使用其中之一取决于您是在客户端还是在服务器上工作。
<Search>是客户端组件，因此您使用useSearchParams()挂钩从客户端访问参数。
<Table>是一个获取自己数据的服务器组件，因此您可以将searchParams属性从页面传递到组件。
作为一般规则，如果您想从客户端读取参数，请使用useSearchParams()挂钩，因为这样可以避免返回服务器。


去抖是一种限制函数触发速率的编程实践。在我们的例子中，您只想在用户停止输入时查询数据库。
去抖的工作原理：
触发事件：当发生应该去抖的事件（例如搜索框中的按键）时，计时器就会启动。
等待：如果在计时器到期之前发生新事件，则重置计时器。
执行：如果计时器到达倒计时结束，则执行去抖功能。
安装use-debounce：
pnpm i use-debounce



Server Actions? 什么是服务器操作？
React Server Actions 允许您直接在服务器上运行异步代码。它们消除了创建 API 端点来改变数据的需要。相反，您可以编写在服务器上执行的异步函数，并且可以从客户端或服务器组件调用。
安全性是 Web 应用程序的首要任务，因为它们很容易受到各种威胁。这就是服务器操作的用武之地。它们提供有效的安全解决方案，防止不同类型的攻击，保护您的数据并确保授权访问。服务器操作通过 POST 请求、加密闭包、严格输入检查、错误消息散列和主机限制等技术来实现这一点，所有这些技术一起工作可以显着增强应用程序的安全性。


将表单与服务器操作结合使用
在 React 中，您可以使用<form>元素中的action属性来调用操作。该操作将自动接收本机FormData对象，包含捕获的数据。
For example: 例如：
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    'use server';
    // Logic to mutate data...
  }
  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;
}
在服务器组件中调用服务器操作的一个优点是渐进增强 - 即使客户端上禁用 JavaScript，表单也可以工作。

Next.js 与服务器操作
服务器操作还与 Next.js缓存深度集成。通过服务器操作提交表单时，您不仅可以使用该操作来更改数据，还可以使用revalidatePath和revalidateTag等 API 重新验证关联的缓存。

重新验证和重定向
Next.js 有一个客户端路由器缓存，可将路由段存储在用户浏览器中一段时间​​。与预取一起，此缓存可确保用户可以在路由之间快速导航，同时减少向服务器发出的请求数量。
由于您要更新发票路由中显示的数据，因此您希望清除此缓存并向服务器触发新请求。您可以使用 Next.js 中的revalidatePath函数来执行此操作：


使用发票id创建动态路由段
当您不知道确切的路段名称并希望根据数据创建路线时，Next.js 允许您创建动态路线段。这可以是博客文章标题、产品页面等。您可以通过将文件夹名称括在方括号中来创建动态路由段。例如， [id] 、 [post]或[slug] 。


accessibility什么是可达性？
可访问性是指设计和实现每个人（包括残障人士）都可以使用的 Web 应用程序。这是一个涵盖许多领域的广阔主题，例如键盘导航、语义 HTML、图像、颜色、视频等。


在 Next.js 中使用 ESLint 辅助功能插件
Next.js 包含eslint-plugin-jsx-a11y在其 ESLint 配置中添加插件，以帮助及早发现可访问性问题。例如，如果您的图像没有alt文本、错误地使用aria-*和role属性等，此插件会发出警告。
或者，如果您想尝试一下，请将next lint作为脚本添加到package.json文件中：
"lint": "next lint"


提高表单的可访问性
我们已经采取了三项措施来提高表单的可访问性：
1.语义 HTML ：使用语义元素（ <input> 、 <option>等）而不是<div> 。这使得辅助技术assistive technologies(AT) 能够专注于输入元素并向用户提供适当的上下文信息，使表单更易于导航和理解。
2.标签：包括<label>和htmlFor属性可确保每个表单字段都有一个描述性文本标签。这通过提供上下文改进了 AT 支持，并通过允许用户单击标签以关注相应的输入字段来增强可用性。
3.焦点轮廓：字段的样式正确，以便在焦点对准时显示轮廓。这对于可访问性至关重要，因为它直观地指示页面上的活动元素，帮助键盘和屏幕阅读器用户了解他们在表单上的位置。您可以通过按tab来验证这一点。
这些做法为使许多用户更容易访问您的表单奠定了良好的基础。但是，它们不解决表单验证和错误问题。
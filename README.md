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


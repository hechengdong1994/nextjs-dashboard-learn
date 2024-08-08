import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import { Metadata } from 'next';

// 可以在任何layout.js或page.js文件中包含metadata对象，以添加其他页面信息，例如标题和描述。 layout.js中的任何元数据都将被使用它的所有页面继承。
// Next.js 会自动将标题和元数据添加到您的应用程序中。

export const metadata: Metadata = {
  // title: 'Acme Dashboard',
  // 但我们在每个页面中重复应用程序的标题。如果发生变化，例如公司名称，您必须在每个页面上进行更新。
  // 相反，您可以使用metadata对象中的title.template字段来定义页面标题的模板。该模板可以包含页面标题以及您想要包含的任何其他信息。
  // 模板中的%s将替换为特定的页面标题。
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

// 称为根布局并且是必需的。
// 您添加到根布局的任何 UI 将在应用程序中的所有页面之间共享。
// 您可以使用根布局来修改<html>和<body>标记，并添加元数据（您将在后面的章节中了解有关元数据的更多信息）。
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

// 通过将Inter添加到<body>元素，该字体将应用于整个应用程序。在这里，您还添加了 Tailwind antialiased平滑字体的类。没有必要使用这个类，但它增加了一个不错的感觉。
// 导航到浏览器，打开开发工具并选择body元素。您应该看到Inter和Inter_Fallback现在应用在样式下。
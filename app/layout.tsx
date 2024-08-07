import '@/app/ui/global.css';
import { inter } from './ui/fonts';

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
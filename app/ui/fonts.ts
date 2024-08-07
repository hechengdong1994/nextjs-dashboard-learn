import { Inter, Lusitana } from 'next/font/google';

// 从next/font/google模块导入Inter字体 - 这将是您的主要字体。然后指定哪个子集你想加载。
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });

// 从next/font/google模块导入Inter字体 - 这将是您的主要字体。然后指定哪个子集你想加载。
// 最后，将字体添加到/app/layout.tsx中的<body>元素：
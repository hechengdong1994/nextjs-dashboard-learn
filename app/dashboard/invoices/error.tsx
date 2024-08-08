'use client';

import { useEffect } from 'react';

// error.tsx文件可用于定义路线段的 UI 边界。它可以捕获意外错误，并允许您向用户显示fallback UI。

// error ：该对象是 JavaScript 原生Error的实例目的。
// reset ：这是一个重置错误边界的函数。执行时，该函数将尝试重新渲染路线段。
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
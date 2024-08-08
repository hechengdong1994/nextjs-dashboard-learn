'use client';
// 这是一个客户端组件，这意味着您可以使用事件侦听器和挂钩event listeners and hooks

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 此函数将包装handleSearch的内容，并且仅在用户停止键入后的特定时间（300 毫秒）后运行代码。
  const handleSearch = useDebouncedCallback((term) => {
    console.log(term);
    // URLSearchParams是一个 Web API，提供用于操作 URL 查询参数的实用方法。
    // 可以使用它来获取参数字符串，如?page=1&query=a ，而不是创建复杂的字符串文字。
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // 当用户在搜索栏中键入内容时， params.toString()会将此输入转换为 URL 友好的格式。
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // 确保输入字段与 URL 同步并在共享时填充
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

// defaultValue与value /受控与非受控
// 如果您使用状态来管理输入的值，则可以使用value属性使其成为受控组件。这意味着 React 将管理输入的状态。
// 但是，由于您没有使用状态，因此可以使用defaultValue 。这意味着原始输入将管理其自己的状态。这没问题，因为您将搜索查询保存到 URL 而不是状态。
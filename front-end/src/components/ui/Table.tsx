import React from 'react';

interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No data available'
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-[#9CA3AF]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm text-[#F3F4F6]">
        <thead className="bg-[#14151A] text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] border-b border-white/10">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-4 py-3.5 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-[#121318]">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-[#181920] transition-colors">
              {columns.map((col, idx) => (
                <td key={idx} className={`px-4 py-3.5 ${col.className || ''}`}>
                  {col.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

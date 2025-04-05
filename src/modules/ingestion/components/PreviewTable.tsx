export default function PreviewTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: any[];
}) {
  return (
    <div className="overflow-x-auto border border-divider dark:border-divider-dark rounded-md">
      <table className="min-w-full text-sm">
        <thead className="bg-surface-light dark:bg-surface-dark">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="odd:bg-surface-light/50 even:bg-surface dark:odd:bg-surface-dark/50">
              {headers.map((header) => (
                <td key={header} className="px-4 py-2">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
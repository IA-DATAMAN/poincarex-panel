interface Props {
  headers: string[];
  rows: any[][];
  columnTypes?: string[]; // Tipos de columnas detectados
}

export default function PreviewTable({ headers, rows, columnTypes }: Props) {
  if (!headers.length || !rows.length) {
    return (
      <div className="p-4 text-center text-sm text-muted dark:text-muted-dark">
        No hay datos para mostrar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border dark:border-border-dark rounded-md">
      <table className="min-w-full text-sm">
        <thead className="bg-muted dark:bg-muted-dark">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                className="px-3 py-2 text-left font-semibold text-text dark:text-text-dark"
              >
                {header}
                {columnTypes && (
                  <span className="ml-2 text-xs text-muted dark:text-muted-dark">
                    ({columnTypes[index]})
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="even:bg-muted/50 dark:even:bg-muted-dark/20"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2">
                  {cell !== null ? String(cell) : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import Papa from "papaparse";
import { useState } from "react";

type FileType = "csv" | "json" | "xlsx" | "unknown";
// Define ParsedResult at the top of the file or in a shared types file
type ParsedResult = {
  headers: string[];
  rows: any[];
  columnTypes?: string[];
  type: string;
  error?: string;
};

export function useParseFile() {
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [loading, setLoading] = useState(false);

  const parseFile = (file: File, options?: { delimiter?: string; sheetIndex?: number }) => {
    const ext = file.name.split('.').pop()?.toLowerCase() as FileType ?? 'unknown';
    setLoading(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (!content) throw new Error('No se pudo leer el archivo.');

        if (ext === 'csv') {
          const parsed = Papa.parse(content as string, {
            header: true,
            delimiter: options?.delimiter || ',',
          });
          const headers = parsed.meta.fields ?? [];
          const rows = (parsed.data as any[]).slice(0, 20);
          const columnTypes = detectColumnTypes(rows, headers);
          setResult({ headers, rows, columnTypes, type: ext });
        }

        // Similar lógica para JSON y XLSX...

      } catch (err: any) {
        setResult({ headers: [], rows: [], error: err.message, type: 'unknown' });
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  return { parseFile, result, loading };
}

function detectColumnTypes(rows: any[][], headers: string[]): string[] {
  return headers.map((_, colIndex) => {
    const columnValues = rows.map((row) => row[colIndex]);
    if (columnValues.every((val) => typeof val === 'number')) return 'number';
    if (columnValues.every((val) => !isNaN(Date.parse(val)))) return 'date';
    return 'string';
  });
}
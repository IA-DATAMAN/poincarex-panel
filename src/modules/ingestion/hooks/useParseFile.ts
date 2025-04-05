import { useState } from 'react';
import Papa from 'papaparse';

export function useParseFile() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const parseFile = (file: File) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;
      const parsed = Papa.parse(content, { header: true });
      setHeaders(parsed.meta.fields || []);
      setData(parsed.data.slice(0, 20)); // Muestra solo las primeras 20 filas
      setLoading(false);
    };

    reader.readAsText(file);
  };

  return { parseFile, data, headers, loading };
}
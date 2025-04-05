import { useState } from 'react';
import { analyzeWithDeepSeek } from '../services/deepSeekService';



export function useDeepSeek() {
  const [result, setResult] = useState<{ metadata: any; eda: any } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (data: { headers: string[]; rows: any[] }) => {
    setLoading(true);
    setError(null);

    try {
      const analysisResult = await analyzeWithDeepSeek(data);
      setResult(analysisResult);
    } catch (err: any) {
      console.error('Error en useDeepSeek:', err);
      setError(err.message || 'Error desconocido al analizar los datos');
    } finally {
      setLoading(false);
    }
  };

  return { analyze, result, loading, error };
}
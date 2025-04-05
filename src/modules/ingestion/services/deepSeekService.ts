import { analyzeDataWithDeepSeek } from './deepSeekClient';

export async function analyzeWithDeepSeek(
  data: { headers: string[]; rows: any[] }
): Promise<any> {
  try {
    const result = await analyzeDataWithDeepSeek(data);
    return result; // Devuelve los resultados de la API
  } catch (error) {
    console.error('Error al analizar los datos con DeepSeek:', error);
    throw error;
  }
}
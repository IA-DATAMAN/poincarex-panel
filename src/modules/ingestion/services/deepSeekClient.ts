
export async function analyzeDataWithDeepSeek(data: { headers: string[]; rows: any[] }) {
  const apiKey = import.meta.env.VITE_API_KEY_DEEPSEEK;
  const apiUrl = '/v1/chat/completions'; //import.meta.env.VITE_API_URL_DEEPSEEK;

  console.log(apiUrl);
  console.log(`Bearer ${apiKey}`);


  const prompt = `
Tienes una tabla con los siguientes encabezados:
${data.headers.join(', ')}

Aquí hay una muestra de los datos:
${JSON.stringify(data.rows.slice(0, 5), null, 2)}

Tu tarea es hacer un análisis exploratorio de los datos (EDA), detectar columnas importantes, valores faltantes, y sugerir transformaciones para modelado.
`;

  const payload = {
    model: 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content: 'Eres un analista de datos experto. Tu tarea es interpretar datasets estructurados.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 2048,
  };

  try {
    const response = await fetch(apiUrl, {
      
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Error API DeepSeek: ${JSON.stringify(json)}`);
    }

    const content = json.choices?.[0]?.message?.content;
    return content;
  } catch (error: unknown) {
    console.error('❌ Error al analizar datos con DeepSeek:', error);
    throw new Error('No se pudo obtener respuesta de DeepSeek');
  }
}
import OpenAIApi, { Configuration } from 'openai';


// Configuración del cliente de DeepSeek
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_API_KEY_DEEPSEEK, // Clave API desde el .env
  basePath: import.meta.env.VITE_API_URL_DEEPSEEK, // URL base desde el .env
});

const deepSeekClient = new OpenAIApi(configuration);

// Función para analizar datos con DeepSeek
export async function analyzeDataWithDeepSeek(data: { headers: string[]; rows: any[] }) {
  try {
    const response = await deepSeekClient.createChatCompletion({
      model: 'deepseek-chat', // Modelo a utilizar (deepseek-chat o deepseek-reasoner)
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Analyze the following data:\nHeaders: ${JSON.stringify(data.headers)}\nRows: ${JSON.stringify(data.rows)}` },
      ],
      temperature: 1.0, // Controla la creatividad de las respuestas
      max_tokens: 8000, // Máximo de tokens en la respuesta
    });

    console.log('Respuesta de DeepSeek:', response.data); // Verifica la respuesta
    return response.data; // Devuelve los resultados de la API
  } catch (error: any) {
    console.error('Error al comunicarse con DeepSeek:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data); // Muestra detalles del error
    }
    throw new Error('Error al analizar los datos con DeepSeek');
  }
}
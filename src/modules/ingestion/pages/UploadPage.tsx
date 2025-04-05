import { useState } from 'react';
import FileDropzone from '../components/FileDropzone';
import PreviewTable from '../components/PreviewTable';
import { useParseFile } from '../hooks/useParseFile';
import { useDeepSeek } from '../hooks/useDeepSeek';


export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const { parseFile, data, headers, loading: parsing } = useParseFile();
  const { analyze, result: deepSeekResult, loading: analyzing, error } = useDeepSeek();

  const handleFileAccepted = (file: File) => {
    setFile(file);
    parseFile(file);
  };

  const handleAnalyze = async () => {
    if (data.length > 0) {
      await analyze({ headers, rows: data });
    }
  };

  return (
    <section className="p-6 bg-surface text-text dark:bg-surface-dark dark:text-text-dark min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-title dark:text-title-dark">Cargar archivo</h1>
        <p className="text-sm text-subtitle dark:text-subtitle-dark">
          Puedes subir archivos CSV, JSON o Excel (.xlsx) para analizarlos en la plataforma.
        </p>

        <FileDropzone onFileAccepted={handleFileAccepted} />

        {file && (
          <div className="mt-4">
            <p className="text-sm text-muted dark:text-muted-dark">
              Archivo seleccionado: <strong>{file.name}</strong>
            </p>
          </div>
        )}

        {parsing && <p className="text-sm text-muted dark:text-muted-dark">Procesando archivo...</p>}

        {data.length > 0 && (
          <>
            <PreviewTable headers={headers} rows={data} />
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {analyzing ? 'Analizando con DeepSeek...' : 'Analizar con DeepSeek'}
            </button>
          </>
        )}

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

        {deepSeekResult && (
          <div className="mt-6 p-4 bg-secondary/10 rounded-md">
            <h2 className="text-lg font-semibold">Resultados del análisis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-bold">Metadata</h3>
                <pre className="text-sm">{JSON.stringify(deepSeekResult.metadata, null, 2)}</pre>
              </div>
              <div>
                <h3 className="text-md font-bold">EDA</h3>
                <pre className="text-sm">{JSON.stringify(deepSeekResult.eda, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
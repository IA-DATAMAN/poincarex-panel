import { useState } from 'react';
import FileDropzone from './components/FileDropzone';
import PreviewTable from './components/PreviewTable';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data] = useState<any[][]>([]);
  const [headers] = useState<string[]>([]);

  const handleFileAccepted = (file: File) => {
    setFile(file);
    // Aquí puedes agregar lógica adicional para procesar el archivo
    console.log('Archivo aceptado:', file.name);
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

        {data.length > 0 && (
          <PreviewTable headers={headers} rows={data} />
        )}
      </div>
    </section>
  );
}
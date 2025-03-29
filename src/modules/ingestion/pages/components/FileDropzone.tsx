import { useRef, useState } from 'react';

interface Props {
  onFileAccepted: (file: File) => void;
}

export default function FileDropzone({ onFileAccepted }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    const validExtensions = ['csv', 'json', 'xlsx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      setError('Formato de archivo no soportado. Por favor, sube un archivo CSV, JSON o XLSX.');
      return;
    }

    setError(null);
    onFileAccepted(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  return (
    <div
      className="p-6 border border-dashed border-border dark:border-border-dark rounded-md text-center cursor-pointer hover:bg-secondary/5 transition"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="text-sm text-subtitle dark:text-subtitle-dark">
        Haz clic o arrastra un archivo CSV, JSON o XLSX
      </p>

      <input
        type="file"
        ref={inputRef}
        accept=".csv,.json,.xlsx"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">⚠️ {error}</p>
      )}
    </div>
  );
}
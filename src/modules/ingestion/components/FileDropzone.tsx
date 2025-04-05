import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileDropzone({ onFileAccepted }: { onFileAccepted: (file: File) => void }) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-divider dark:border-divider-dark'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-muted dark:text-muted-dark">
        {isDragActive ? 'Suelta el archivo aquí...' : 'Arrastra y suelta un archivo aquí o haz clic para seleccionarlo'}
      </p>
    </div>
  );
}

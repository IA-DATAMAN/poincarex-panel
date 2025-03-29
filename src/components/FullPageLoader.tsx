export default function FullPageLoader({ message }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-screen bg-surface text-text dark:bg-surface-dark dark:text-text-dark">
      <div className="text-center space-y-2">
        <div className="w-6 h-6 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
        <p className="text-sm">{message || 'Cargando...'}</p>
      </div>
    </div>
  );
}

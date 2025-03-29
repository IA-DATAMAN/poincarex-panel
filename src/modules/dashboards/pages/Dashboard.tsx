export default function Dashboard() {
  return (
    <section className="w-full h-full bg-surface text-text dark:bg-surface-dark dark:text-text-dark p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-title dark:text-title-dark">
            Panel de Control
          </h1>
          <p className="text-sm text-subtitle dark:text-subtitle-dark">
            Bienvenido al sistema PoincareX.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-surface-dark rounded-md border border-border dark:border-border-dark shadow-sm p-4">
            <h2 className="text-base font-semibold mb-1">Estado del sistema</h2>
            <p className="text-sm text-subtitle dark:text-subtitle-dark">Todo operativo</p>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-md border border-border dark:border-border-dark shadow-sm p-4">
            <h2 className="text-base font-semibold mb-1">Usuarios activos</h2>
            <p className="text-sm text-subtitle dark:text-subtitle-dark">+120</p>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-md border border-border dark:border-border-dark shadow-sm p-4">
            <h2 className="text-base font-semibold mb-1">Último modelo</h2>
            <p className="text-sm text-subtitle dark:text-subtitle-dark">Predicción de demanda 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}

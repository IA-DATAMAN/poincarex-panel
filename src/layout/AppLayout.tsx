import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="
      flex h-screen 
      bg-surface dark:bg-surface-dark 
      text-text dark:text-text-dark 
      font-sans
    ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="
          flex-1 overflow-y-auto p-6 
          bg-surface-light dark:bg-surface-dark-light
        ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
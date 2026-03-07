import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Zap, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { ReactNode, useEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const titleMap: Record<string, string> = {
      '/': 'Study - Witty',
      '/matcher': 'Make - Witty',
      '/catalog': 'Catalog - Witty'
    };
    document.title = titleMap[location.pathname] || 'Witty';
  }, [location]);

  const navItems = [
    { path: '/', label: 'Study', icon: BookOpen },
    { path: '/catalog', label: 'Catalog', icon: Search },
    { path: '/matcher', label: 'Make', icon: Zap },
  ];

  return (
    <div className="min-h-screen w-full bg-stone-50 text-stone-900 font-sans font-light relative overflow-x-hidden selection:bg-yellow-200 selection:text-stone-900 flex flex-col">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-200/40 rounded-full blur-[80px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 rounded-full blur-[80px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-yellow-100/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 pt-8 pb-0 px-6 flex flex-col items-center gap-6 flex-shrink-0">
        <h1 className="font-serif font-bold text-4xl tracking-tight text-stone-900">Witty</h1>
        
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-8 border-b border-stone-200/50 w-full justify-center max-w-md mx-auto relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative pb-3 px-2 group"
              >
                <span className={clsx(
                  "font-serif font-bold text-lg transition-colors duration-300",
                  isActive ? "text-stone-900" : "text-stone-400 group-hover:text-stone-600"
                )}>
                  {item.label}
                </span>
                
                {/* Active Indicator - Blue Yellow Gradient Underline */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 to-yellow-400 rounded-t-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-3xl mx-auto p-4 md:p-6 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}

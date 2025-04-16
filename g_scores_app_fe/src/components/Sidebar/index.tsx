'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart3, FileText, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    name: 'Search Scores',
    href: '/search',
    icon: <Search className="h-5 w-5" />,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: <FileText className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed text-yellow-500 bg-white top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      <aside
        className={cn(
          'bg-blue-600 text-yellow-300 w-64 flex-shrink-0 transition-all duration-300 ease-in-out',
          isOpen ? 'fixed inset-y-0 left-0 z-40' : 'hidden md:block'
        )}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Menu</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center text-white gap-3 px-3 py-2 rounded-md transition-colors hover:bg-black/10',
                  location.pathname === item.href &&
                    'bg-amber-400 font-medium hover:bg-amber-400'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

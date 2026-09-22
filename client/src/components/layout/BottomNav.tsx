import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Compass, Library, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/library', label: 'Library', icon: Library },
    { to: '/subscription', label: 'Premium', icon: Sparkles },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0c0d14]/95 backdrop-blur-lg border-t border-[#1e2034] z-40 flex items-center justify-around px-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-lg transition-colors ${
              isActive
                ? 'text-cyan-400 font-medium'
                : 'text-gray-400 hover:text-gray-200'
            }`
          }
        >
          <item.icon size={20} />
          <span className="text-[10px] tracking-tight">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

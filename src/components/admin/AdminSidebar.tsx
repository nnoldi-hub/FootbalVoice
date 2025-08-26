import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Mail, 
  BarChart3, 
  X,
  Plus,
  Eye
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      path: '/admin/articles',
      icon: FileText,
      label: 'Articole',
      badge: null
    },
    {
      path: '/admin/articles/new',
      icon: Plus,
      label: 'Articol Nou',
      badge: null
    },
    {
      path: '/admin/subscribers',
      icon: Users,
      label: 'Abonați',
      badge: '24'
    },
    {
      path: '/admin/newsletter',
      icon: Mail,
      label: 'Newsletter',
      badge: null
    },
    {
      path: '/admin/analytics',
      icon: BarChart3,
      label: 'Statistici',
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              <Eye className="w-5 h-5" />
              <span className="font-medium">Vezi Site-ul</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
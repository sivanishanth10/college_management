import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar,
  GraduationCap,
  X,
  User
} from 'lucide-react'

const Sidebar = ({ user, isOpen, onClose }) => {
  const location = useLocation()

  const getNavItems = () => {
    switch (user?.role) {
      case 'ADMIN':
        return [
          { path: '/admin', label: 'Dashboard', icon: Home },
          { path: '/admin/courses', label: 'Courses', icon: BookOpen },
          { path: '/admin/students', label: 'Students', icon: Users },
          { path: '/admin/exams', label: 'Exams', icon: FileText },
          { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
        ]
      case 'FACULTY':
        return [
          { path: '/faculty', label: 'Dashboard', icon: Home },
          { path: '/faculty/courses', label: 'My Courses', icon: BookOpen },
          { path: '/faculty/exams', label: 'Exams', icon: FileText },
          { path: '/faculty/results', label: 'Results', icon: BarChart3 },
        ]
      case 'STUDENT':
        return [
          { path: '/student', label: 'Dashboard', icon: Home },
          { path: '/student/courses', label: 'My Courses', icon: BookOpen },
          { path: '/student/exams', label: 'Exam Schedule', icon: Calendar },
          { path: '/student/results', label: 'My Results', icon: GraduationCap },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose()}
                  className={`
                    sidebar-item ${isActive ? 'active' : ''}
                  `}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

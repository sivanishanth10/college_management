import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { fetchCourses } from '../../store/slices/courseSlice'
import { fetchStudents } from '../../store/slices/studentSlice'
import { fetchExams } from '../../store/slices/examSlice'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { courses, loading: coursesLoading } = useSelector((state) => state.courses)
  const { students, loading: studentsLoading } = useSelector((state) => state.students)
  const { exams, loading: examsLoading } = useSelector((state) => state.exams)

  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchStudents())
    dispatch(fetchExams())
  }, [dispatch])

  const stats = [
    {
      title: 'Total Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/admin/courses'
    },
    {
      title: 'Total Students',
      value: students.length,
      icon: Users,
      color: 'bg-green-500',
      link: '/admin/students'
    },
    {
      title: 'Total Exams',
      value: exams.length,
      icon: FileText,
      color: 'bg-purple-500',
      link: '/admin/exams'
    },
    {
      title: 'Reports',
      value: 'View',
      icon: BarChart3,
      color: 'bg-orange-500',
      link: '/admin/reports'
    }
  ]

  const recentCourses = courses.slice(0, 5)
  const recentStudents = students.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the College Exam Management System</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link
              key={index}
              to={stat.link}
              className="card hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/courses"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 text-primary-600 mr-3" />
            <span className="font-medium text-gray-900">Add New Course</span>
          </Link>
          <Link
            to="/admin/students"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 text-primary-600 mr-3" />
            <span className="font-medium text-gray-900">Add New Student</span>
          </Link>
          <Link
            to="/admin/exams"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 text-primary-600 mr-3" />
            <span className="font-medium text-gray-900">Schedule New Exam</span>
          </Link>
        </div>
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Courses</h2>
            <Link to="/admin/courses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {coursesLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : recentCourses.length > 0 ? (
              recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{course.name}</p>
                    <p className="text-sm text-gray-600">{course.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/courses/${course.id}`}
                      className="p-1 text-blue-600 hover:text-blue-700"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/admin/courses/${course.id}/edit`}
                      className="p-1 text-green-600 hover:text-green-700"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No courses found</p>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Students</h2>
            <Link to="/admin/students" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {studentsLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : recentStudents.length > 0 ? (
              recentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/students/${student.id}`}
                      className="p-1 text-blue-600 hover:text-blue-700"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/admin/students/${student.id}/edit`}
                      className="p-1 text-green-600 hover:text-green-700"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No students found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

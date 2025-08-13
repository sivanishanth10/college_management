import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from '../../store/slices/courseSlice'
import { fetchExams } from '../../store/slices/examSlice'
import { BookOpen, FileText, Users, Calendar } from 'lucide-react'

const FacultyDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { courses, loading: coursesLoading } = useSelector((state) => state.courses)
  const { exams, loading: examsLoading } = useSelector((state) => state.exams)

  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchExams())
  }, [dispatch])

  const facultyCourses = courses.filter(course => course.faculty?.id === user?.id)
  const facultyExams = exams.filter(exam => exam.course?.faculty?.id === user?.id)

  const stats = [
    {
      title: 'My Courses',
      value: facultyCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/faculty/courses'
    },
    {
      title: 'Total Exams',
      value: facultyExams.length,
      icon: FileText,
      color: 'bg-green-500',
      link: '/faculty/exams'
    },
    {
      title: 'Total Students',
      value: facultyCourses.reduce((total, course) => total + (course.students?.length || 0), 0),
      icon: Users,
      color: 'bg-purple-500',
      link: '/faculty/courses'
    },
    {
      title: 'Upcoming Exams',
      value: facultyExams.filter(exam => new Date(exam.examDate) > new Date()).length,
      icon: Calendar,
      color: 'bg-orange-500',
      link: '/faculty/exams'
    }
  ]

  const recentExams = facultyExams.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.fullName}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Exams */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Exams</h2>
        <div className="space-y-3">
          {examsLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : recentExams.length > 0 ? (
            recentExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{exam.title}</p>
                  <p className="text-sm text-gray-600">{exam.course?.name} • {exam.type}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(exam.examDate).toLocaleDateString()} at {new Date(exam.examDate).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{exam.totalMarks} marks</p>
                  <p className="text-xs text-gray-500">{exam.duration} min</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No exams scheduled yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
            <BookOpen className="h-5 w-5 text-primary-600 mr-3" />
            <span className="font-medium text-gray-900">View My Courses</span>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
            <FileText className="h-5 w-5 text-primary-600 mr-3" />
            <span className="font-medium text-gray-900">Schedule New Exam</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FacultyDashboard

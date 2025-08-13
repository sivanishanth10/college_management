import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from '../../store/slices/courseSlice'
import { fetchExams } from '../../store/slices/examSlice'
import { fetchResults } from '../../store/slices/resultSlice'
import { BookOpen, Calendar, GraduationCap, TrendingUp } from 'lucide-react'

const StudentDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { courses, loading: coursesLoading } = useSelector((state) => state.courses)
  const { exams, loading: examsLoading } = useSelector((state) => state.exams)
  const { results, loading: resultsLoading } = useSelector((state) => state.results)

  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchExams())
    dispatch(fetchResults())
  }, [dispatch])

  // Filter data for current student
  const studentCourses = courses.filter(course => 
    course.students?.some(student => student.id === user?.id)
  )
  const studentExams = exams.filter(exam => 
    studentCourses.some(course => course.id === exam.course?.id)
  )
  const studentResults = results.filter(result => result.student?.id === user?.id)

  const upcomingExams = studentExams.filter(exam => new Date(exam.examDate) > new Date())
  const completedExams = studentExams.filter(exam => new Date(exam.examDate) <= new Date())

  const averageScore = studentResults.length > 0 
    ? studentResults.reduce((sum, result) => sum + (result.percentage || 0), 0) / studentResults.length
    : 0

  const stats = [
    {
      title: 'Enrolled Courses',
      value: studentCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Upcoming Exams',
      value: upcomingExams.length,
      icon: Calendar,
      color: 'bg-orange-500'
    },
    {
      title: 'Completed Exams',
      value: completedExams.length,
      icon: GraduationCap,
      color: 'bg-green-500'
    },
    {
      title: 'Average Score',
      value: `${averageScore.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
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

      {/* Upcoming Exams */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams</h2>
        <div className="space-y-3">
          {examsLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : upcomingExams.length > 0 ? (
            upcomingExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-medium text-gray-900">{exam.title}</p>
                  <p className="text-sm text-gray-600">{exam.course?.name} • {exam.type}</p>
                  <p className="text-xs text-orange-600">
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
            <p className="text-gray-500 text-center py-4">No upcoming exams</p>
          )}
        </div>
      </div>

      {/* Recent Results */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h2>
        <div className="space-y-3">
          {resultsLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : studentResults.length > 0 ? (
            studentResults.slice(0, 5).map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{result.exam?.title}</p>
                  <p className="text-sm text-gray-600">{result.exam?.course?.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(result.submissionDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {result.marksObtained}/{result.exam?.totalMarks}
                  </p>
                  <p className="text-xs text-gray-500">{result.grade}</p>
                  <p className="text-xs text-gray-500">{result.percentage?.toFixed(1)}%</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No results available yet</p>
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
            <Calendar className="h-5 w-5 text-primary-600 mr-3" />
            <span className="font-medium text-gray-900">View Exam Schedule</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

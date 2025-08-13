import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminCourses from './pages/Admin/Courses'
import AdminStudents from './pages/Admin/Students'
import AdminExams from './pages/Admin/Exams'
import AdminReports from './pages/Admin/Reports'
import FacultyDashboard from './pages/Faculty/Dashboard'
import FacultyCourses from './pages/Faculty/Courses'
import FacultyExams from './pages/Faculty/Exams'
import FacultyResults from './pages/Faculty/Results'
import StudentDashboard from './pages/Student/Dashboard'
import StudentCourses from './pages/Student/Courses'
import StudentExams from './pages/Student/Exams'
import StudentResults from './pages/Student/Results'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} 
      />

      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/courses" 
          element={
            <ProtectedRoute role="ADMIN">
              <AdminCourses />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/students" 
          element={
            <ProtectedRoute role="ADMIN">
              <AdminStudents />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/exams" 
          element={
            <ProtectedRoute role="ADMIN">
              <AdminExams />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <ProtectedRoute role="ADMIN">
              <AdminReports />
            </ProtectedRoute>
          } 
        />

        {/* Faculty routes */}
        <Route 
          path="/faculty" 
          element={
            <ProtectedRoute role="FACULTY">
              <FacultyDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/faculty/courses" 
          element={
            <ProtectedRoute role="FACULTY">
              <FacultyCourses />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/faculty/exams" 
          element={
            <ProtectedRoute role="FACULTY">
              <FacultyExams />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/faculty/results" 
          element={
            <ProtectedRoute role="FACULTY">
              <FacultyResults />
            </ProtectedRoute>
          } 
        />

        {/* Student routes */}
        <Route 
          path="/student" 
          element={
            <ProtectedRoute role="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/courses" 
          element={
            <ProtectedRoute role="STUDENT">
              <StudentCourses />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/exams" 
          element={
            <ProtectedRoute role="STUDENT">
              <StudentExams />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/results" 
          element={
            <ProtectedRoute role="STUDENT">
              <StudentResults />
            </ProtectedRoute>
          } 
        />

        {/* Default redirect based on role */}
        <Route 
          path="/" 
          element={
            <Navigate 
              to={
                user?.role === 'ADMIN' ? '/admin' :
                user?.role === 'FACULTY' ? '/faculty' :
                user?.role === 'STUDENT' ? '/student' : '/login'
              } 
              replace 
            />
          } 
        />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

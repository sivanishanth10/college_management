import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  fetchCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  setSelectedCourse,
  clearSelectedCourse
} from '../../store/slices/courseSlice'
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminCourses = () => {
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    facultyId: ''
  })
  
  const dispatch = useDispatch()
  const { courses, loading, selectedCourse } = useSelector((state) => state.courses)
  const { students } = useSelector((state) => state.students)

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      if (isEditing) {
        await dispatch(updateCourse({ id: selectedCourse.id, courseData: formData })).unwrap()
        toast.success('Course updated successfully!')
      } else {
        await dispatch(createCourse(formData)).unwrap()
        toast.success('Course created successfully!')
      }
      
      setShowModal(false)
      resetForm()
    } catch (error) {
      toast.error(error || 'Operation failed')
    }
  }

  const handleEdit = (course) => {
    setSelectedCourse(course)
    setFormData({
      name: course.name,
      description: course.description,
      facultyId: course.faculty?.id || ''
    })
    setIsEditing(true)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await dispatch(deleteCourse(id)).unwrap()
        toast.success('Course deleted successfully!')
      } catch (error) {
        toast.error(error || 'Delete failed')
      }
    }
  }

  const resetForm = () => {
    setFormData({ name: '', description: '', facultyId: '' })
    setIsEditing(false)
    dispatch(clearSelectedCourse())
  }

  const openCreateModal = () => {
    resetForm()
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Manage all courses in the system</p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Course
        </button>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-1 text-blue-600 hover:text-blue-700"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="text-sm text-gray-500">
                <p>Faculty: {course.faculty?.fullName || 'Not assigned'}</p>
                <p>Students: {course.students?.length || 0}</p>
                <p>Exams: {course.exams?.length || 0}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found. Create your first course!</p>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditing ? 'Edit Course' : 'Create Course'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Enter course description"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {isEditing ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCourses

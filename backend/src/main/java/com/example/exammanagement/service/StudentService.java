package com.example.exammanagement.service;

import com.example.exammanagement.entity.Student;
import com.example.exammanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }
    
    public List<Student> getStudentsByCourse(Long courseId) {
        return studentRepository.findByCourseId(courseId);
    }
    
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }
    
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);
        
        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        student.setRollNumber(studentDetails.getRollNumber());
        student.setPhoneNumber(studentDetails.getPhoneNumber());
        student.setCourses(studentDetails.getCourses());
        
        return studentRepository.save(student);
    }
    
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }
}

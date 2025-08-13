package com.example.exammanagement.service;

import com.example.exammanagement.entity.Course;
import com.example.exammanagement.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }
    
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }
    
    public Course updateCourse(Long id, Course courseDetails) {
        Course course = getCourseById(id);
        
        course.setName(courseDetails.getName());
        course.setCode(courseDetails.getCode());
        course.setDescription(courseDetails.getDescription());
        course.setCredits(courseDetails.getCredits());
        course.setFaculty(courseDetails.getFaculty());
        
        return courseRepository.save(course);
    }
    
    public void deleteCourse(Long id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
    }
}

package com.example.exammanagement.repository;

import com.example.exammanagement.entity.Course;
import com.example.exammanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    List<Course> findByFaculty(User faculty);
    
    @Query("SELECT c FROM Course c WHERE c.faculty.id = :facultyId")
    List<Course> findByFacultyId(@Param("facultyId") Long facultyId);
    
    boolean existsByName(String name);
}

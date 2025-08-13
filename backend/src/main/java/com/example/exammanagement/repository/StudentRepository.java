package com.example.exammanagement.repository;

import com.example.exammanagement.entity.Student;
import com.example.exammanagement.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    Optional<Student> findByEmail(String email);
    
    Optional<Student> findByRollNumber(String rollNumber);
    
    boolean existsByEmail(String email);
    
    boolean existsByRollNumber(String rollNumber);
    
    @Query("SELECT s FROM Student s JOIN s.courses c WHERE c.id = :courseId")
    List<Student> findByCourseId(@Param("courseId") Long courseId);
}

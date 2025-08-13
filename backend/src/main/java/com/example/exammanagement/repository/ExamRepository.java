package com.example.exammanagement.repository;

import com.example.exammanagement.entity.Exam;
import com.example.exammanagement.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    
    List<Exam> findByCourse(Course course);
    
    List<Exam> findByCourseId(Long courseId);
    
    @Query("SELECT e FROM Exam e WHERE e.faculty.id = :facultyId")
    List<Exam> findByFacultyId(@Param("facultyId") Long facultyId);
    
    List<Exam> findByExamDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Exam> findByType(Exam.ExamType type);
}

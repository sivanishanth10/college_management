package com.example.exammanagement.repository;

import com.example.exammanagement.entity.Result;
import com.example.exammanagement.entity.Student;
import com.example.exammanagement.entity.Exam;
import com.example.exammanagement.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    
    List<Result> findByStudent(Student student);
    
    List<Result> findByStudentId(Long studentId);
    
    List<Result> findByExam(Exam exam);
    
    List<Result> findByExamId(Long examId);
    
    @Query("SELECT r FROM Result r WHERE r.exam.course.id = :courseId")
    List<Result> findByCourseId(@Param("courseId") Long courseId);
    
    @Query("SELECT r FROM Result r WHERE r.student.id = :studentId AND r.exam.course.id = :courseId")
    List<Result> findByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);
    
    boolean existsByStudentAndExam(Student student, Exam exam);
}

package com.example.exammanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDateTime;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "results")
public class Result {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Student is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @NotNull(message = "Exam is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;
    
    @NotNull(message = "Marks obtained is required")
    @PositiveOrZero(message = "Marks obtained cannot be negative")
    @Column(name = "marks_obtained", nullable = false)
    private Integer marksObtained;
    
    @Column(name = "submission_date")
    private LocalDateTime submissionDate;
    
    @Size(max = 100, message = "Grade cannot exceed 100 characters")
    private String grade;
    
    @Size(max = 500, message = "Remarks cannot exceed 500 characters")
    @Column(columnDefinition = "TEXT")
    private String remarks;
    
    // Constructors
    public Result() {}
    
    public Result(Student student, Exam exam, Integer marksObtained) {
        this.student = student;
        this.exam = exam;
        this.marksObtained = marksObtained;
        this.submissionDate = LocalDateTime.now();
        this.grade = calculateGrade(marksObtained, exam.getTotalMarks());
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Student getStudent() {
        return student;
    }
    
    public void setStudent(Student student) {
        this.student = student;
    }
    
    public Exam getExam() {
        return exam;
    }
    
    public void setExam(Exam exam) {
        this.exam = exam;
    }
    
    public Integer getMarksObtained() {
        return marksObtained;
    }
    
    public void setMarksObtained(Integer marksObtained) {
        this.marksObtained = marksObtained;
        if (this.exam != null) {
            this.grade = calculateGrade(marksObtained, this.exam.getTotalMarks());
        }
    }
    
    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }
    
    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }
    
    public String getGrade() {
        return grade;
    }
    
    public void setGrade(String grade) {
        this.grade = grade;
    }
    
    public String getRemarks() {
        return remarks;
    }
    
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    
    // Helper methods
    private String calculateGrade(Integer marksObtained, Integer totalMarks) {
        if (marksObtained == null || totalMarks == null || totalMarks == 0) {
            return "N/A";
        }
        
        double percentage = (double) marksObtained / totalMarks * 100;
        
        if (percentage >= 90) return "A+";
        else if (percentage >= 80) return "A";
        else if (percentage >= 70) return "B+";
        else if (percentage >= 60) return "B";
        else if (percentage >= 50) return "C+";
        else if (percentage >= 40) return "C";
        else if (percentage >= 35) return "D";
        else return "F";
    }
    
    public double getPercentage() {
        if (marksObtained == null || exam == null || exam.getTotalMarks() == null || exam.getTotalMarks() == 0) {
            return 0.0;
        }
        return (double) marksObtained / exam.getTotalMarks() * 100;
    }
}

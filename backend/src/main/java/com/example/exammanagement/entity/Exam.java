package com.example.exammanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "exams")
public class Exam {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Exam title is required")
    @Size(max = 200, message = "Exam title cannot exceed 200 characters")
    @Column(nullable = false)
    private String title;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Exam date is required")
    @Column(name = "exam_date", nullable = false)
    private LocalDateTime examDate;
    
    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    @Column(nullable = false)
    private Integer duration; // in minutes
    
    @NotNull(message = "Total marks is required")
    @Positive(message = "Total marks must be positive")
    @Column(name = "total_marks", nullable = false)
    private Integer totalMarks;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExamType type;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Result> results = new ArrayList<>();
    
    // Constructors
    public Exam() {}
    
    public Exam(String title, String description, LocalDateTime examDate, Integer duration, 
                Integer totalMarks, ExamType type, Course course) {
        this.title = title;
        this.description = description;
        this.examDate = examDate;
        this.duration = duration;
        this.totalMarks = totalMarks;
        this.type = type;
        this.course = course;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDateTime getExamDate() {
        return examDate;
    }
    
    public void setExamDate(LocalDateTime examDate) {
        this.examDate = examDate;
    }
    
    public Integer getDuration() {
        return duration;
    }
    
    public void setDuration(Integer duration) {
        this.duration = duration;
    }
    
    public Integer getTotalMarks() {
        return totalMarks;
    }
    
    public void setTotalMarks(Integer totalMarks) {
        this.totalMarks = totalMarks;
    }
    
    public ExamType getType() {
        return type;
    }
    
    public void setType(ExamType type) {
        this.type = type;
    }
    
    public Course getCourse() {
        return course;
    }
    
    public void setCourse(Course course) {
        this.course = course;
    }
    
    public List<Result> getResults() {
        return results;
    }
    
    public void setResults(List<Result> results) {
        this.results = results;
    }
    
    // Helper methods
    public void addResult(Result result) {
        results.add(result);
        result.setExam(this);
    }
    
    public void removeResult(Result result) {
        results.remove(result);
        result.setExam(null);
    }
    
    // ExamType enum
    public enum ExamType {
        MIDTERM, FINAL, QUIZ, ASSIGNMENT
    }
}

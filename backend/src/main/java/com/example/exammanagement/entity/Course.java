package com.example.exammanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Positive;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Course name is required")
    @Size(min = 2, max = 100, message = "Course name must be between 2 and 100 characters")
    @Column(nullable = false)
    private String name;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Size(max = 10, message = "Course code cannot exceed 10 characters")
    @Column(name = "course_code", unique = true)
    private String code;
    
    @Positive(message = "Credits must be positive")
    @Column(nullable = false)
    private Integer credits = 3; // Default to 3 credits
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_id")
    private User faculty;
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Exam> exams = new ArrayList<>();
    
    @ManyToMany(mappedBy = "courses", fetch = FetchType.LAZY)
    private List<Student> students = new ArrayList<>();
    
    // Constructors
    public Course() {}
    
    public Course(String name, String description, String code, Integer credits, User faculty) {
        this.name = name;
        this.description = description;
        this.code = code;
        this.credits = credits;
        this.faculty = faculty;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getCode() {
        return code;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public Integer getCredits() {
        return credits;
    }
    
    public void setCredits(Integer credits) {
        this.credits = credits;
    }
    
    public User getFaculty() {
        return faculty;
    }
    
    public void setFaculty(User faculty) {
        this.faculty = faculty;
    }
    
    public List<Exam> getExams() {
        return exams;
    }
    
    public void setExams(List<Exam> exams) {
        this.exams = exams;
    }
    
    public List<Student> getStudents() {
        return students;
    }
    
    public void setStudents(List<Student> students) {
        this.students = students;
    }
    
    // Helper methods
    public void addExam(Exam exam) {
        exams.add(exam);
        exam.setCourse(this);
    }
    
    public void removeExam(Exam exam) {
        exams.remove(exam);
        exam.setCourse(null);
    }
    
    public void addStudent(Student student) {
        students.add(student);
        student.getCourses().add(this);
    }
    
    public void removeStudent(Student student) {
        students.remove(student);
        student.getCourses().remove(this);
    }
}

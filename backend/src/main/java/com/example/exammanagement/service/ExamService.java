package com.example.exammanagement.service;

import com.example.exammanagement.entity.Exam;
import com.example.exammanagement.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {
    
    @Autowired
    private ExamRepository examRepository;
    
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }
    
    public Exam getExamById(Long id) {
        return examRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Exam not found with id: " + id));
    }
    
    public List<Exam> getExamsByCourse(Long courseId) {
        return examRepository.findByCourseId(courseId);
    }
    
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }
    
    public Exam updateExam(Long id, Exam examDetails) {
        Exam exam = getExamById(id);
        
        exam.setTitle(examDetails.getTitle());
        exam.setDescription(examDetails.getDescription());
        exam.setExamDate(examDetails.getExamDate());
        exam.setDuration(examDetails.getDuration());
        exam.setTotalMarks(examDetails.getTotalMarks());
        exam.setCourse(examDetails.getCourse());
        
        return examRepository.save(exam);
    }
    
    public void deleteExam(Long id) {
        Exam exam = getExamById(id);
        examRepository.delete(exam);
    }
}

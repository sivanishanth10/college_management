package com.example.exammanagement.service;

import com.example.exammanagement.entity.Result;
import com.example.exammanagement.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {
    
    @Autowired
    private ResultRepository resultRepository;
    
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
    
    public Result getResultById(Long id) {
        return resultRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Result not found with id: " + id));
    }
    
    public List<Result> getResultsByStudent(Long studentId) {
        return resultRepository.findByStudentId(studentId);
    }
    
    public List<Result> getResultsByExam(Long examId) {
        return resultRepository.findByExamId(examId);
    }
    
    public Result createResult(Result result) {
        return resultRepository.save(result);
    }
    
    public Result updateResult(Long id, Result resultDetails) {
        Result result = getResultById(id);
        
        result.setMarksObtained(resultDetails.getMarksObtained());
        result.setTotalMarks(resultDetails.getTotalMarks());
        result.setGrade(resultDetails.getGrade());
        result.setRemarks(resultDetails.getRemarks());
        result.setExam(resultDetails.getExam());
        result.setStudent(resultDetails.getStudent());
        
        return resultRepository.save(result);
    }
    
    public void deleteResult(Long id) {
        Result result = getResultById(id);
        resultRepository.delete(result);
    }
}

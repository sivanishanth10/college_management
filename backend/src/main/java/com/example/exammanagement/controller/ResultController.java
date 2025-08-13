package com.example.exammanagement.controller;

import com.example.exammanagement.entity.Result;
import com.example.exammanagement.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class ResultController {
    
    @Autowired
    private ResultService resultService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<List<Result>> getAllResults() {
        List<Result> results = resultService.getAllResults();
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(@PathVariable Long id) {
        Result result = resultService.getResultById(id);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Result>> getResultsByStudent(@PathVariable Long studentId) {
        List<Result> results = resultService.getResultsByStudent(studentId);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/exam/{examId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<List<Result>> getResultsByExam(@PathVariable Long examId) {
        List<Result> results = resultService.getResultsByExam(examId);
        return ResponseEntity.ok(results);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<Result> createResult(@RequestBody Result result) {
        Result createdResult = resultService.createResult(result);
        return ResponseEntity.ok(createdResult);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
    public ResponseEntity<Result> updateResult(@PathVariable Long id, @RequestBody Result result) {
        Result updatedResult = resultService.updateResult(id, result);
        return ResponseEntity.ok(updatedResult);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
        return ResponseEntity.ok().build();
    }
}

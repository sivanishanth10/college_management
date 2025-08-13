package com.example.exammanagement.controller;

import com.example.exammanagement.dto.AuthRequest;
import com.example.exammanagement.dto.AuthResponse;
import com.example.exammanagement.dto.SignupRequest;
import com.example.exammanagement.entity.User;
import com.example.exammanagement.security.JwtTokenProvider;
import com.example.exammanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(),
                authRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        User user = userService.findByUsername(authRequest.getUsername());
        
        AuthResponse response = new AuthResponse();
        response.setToken(jwt);
        response.setUser(user);
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest signupRequest) {
        User user = userService.createUser(signupRequest);
        String jwt = tokenProvider.generateToken(user.getUsername());
        
        AuthResponse response = new AuthResponse();
        response.setToken(jwt);
        response.setUser(user);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String jwt = tokenProvider.generateToken(authentication);
        
        User user = userService.findByUsername(authentication.getName());
        
        AuthResponse response = new AuthResponse();
        response.setToken(jwt);
        response.setUser(user);
        
        return ResponseEntity.ok(response);
    }
}

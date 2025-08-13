package com.example.exammanagement.config;

import com.example.exammanagement.entity.User;
import com.example.exammanagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if it doesn't exist
        if (!userRepository.findByUsername("admin").isPresent()) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setEmail("admin@college.com");
            adminUser.setFullName("System Administrator");
            adminUser.setRole(User.UserRole.ADMIN);
            adminUser.setActive(true);
            
            userRepository.save(adminUser);
            System.out.println("Default admin user created successfully!");
        }

        // Create default faculty user if it doesn't exist
        if (!userRepository.findByUsername("faculty").isPresent()) {
            User facultyUser = new User();
            facultyUser.setUsername("faculty");
            facultyUser.setPassword(passwordEncoder.encode("faculty123"));
            facultyUser.setEmail("faculty@college.com");
            facultyUser.setFullName("Default Faculty");
            facultyUser.setRole(User.UserRole.FACULTY);
            facultyUser.setActive(true);
            
            userRepository.save(facultyUser);
            System.out.println("Default faculty user created successfully!");
        }

        // Create default student user if it doesn't exist
        if (!userRepository.findByUsername("student").isPresent()) {
            User studentUser = new User();
            studentUser.setUsername("student");
            studentUser.setPassword(passwordEncoder.encode("student123"));
            studentUser.setEmail("student@college.com");
            studentUser.setFullName("Default Student");
            studentUser.setRole(User.UserRole.STUDENT);
            studentUser.setActive(true);
            
            userRepository.save(studentUser);
            System.out.println("Default student user created successfully!");
        }
    }
}

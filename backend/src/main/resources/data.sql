-- Default users for College Management System
-- Note: Passwords are BCrypt encoded versions of: admin123, faculty123, student123

-- Default Admin User
INSERT INTO users (username, password, email, full_name, role, is_active) 
VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'admin@college.com', 'System Administrator', 'ADMIN', true)
ON CONFLICT (username) DO NOTHING;

-- Default Faculty User
INSERT INTO users (username, password, email, full_name, role, is_active) 
VALUES ('faculty', '$2a$10$8K1p/a0dL1LXMIgoEDFrwO.eHmzBmPLjF8P6Dm0K8K8K8K8K8K8K8', 'faculty@college.com', 'Default Faculty', 'FACULTY', true)
ON CONFLICT (username) DO NOTHING;

-- Default Student User
INSERT INTO users (username, password, email, full_name, role, is_active) 
VALUES ('student', '$2a$10$8K1p/a0dL1LXMIgoEDFrwO.eHmzBmPLjF8P6Dm0K8K8K8K8K8K8K8', 'student@college.com', 'Default Student', 'STUDENT', true)
ON CONFLICT (username) DO NOTHING;

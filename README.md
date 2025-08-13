# College Course & Exam Management System

A comprehensive web application for managing college courses, students, exams, and results with role-based access control.

## Features

- **Role-based Access Control**: Admin, Faculty, and Student roles
- **Course Management**: CRUD operations for courses
- **Student Management**: Student registration and course enrollment
- **Exam Management**: Schedule and manage exams
- **Result Management**: Upload and view exam results
- **Reports**: Performance analytics and charts
- **JWT Authentication**: Secure API access
- **Responsive UI**: Mobile-friendly interface

## Technology Stack

### Frontend
- React 18
- Vite (Build tool)
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Recharts (for charts)
- Lucide React (Icons)

### Backend
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL Database
- Maven
- OpenJDK 24

## Project Structure

```
college-exam-management/
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/          # Shared UI components
│   │   ├── pages/               # Role-based pages
│   │   ├── store/               # Redux store and slices
│   │   ├── services/            # API services
│   │   └── App.jsx             # Main app component
│   └── package.json
├── backend/                      # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/example/exammanagement/
│   │       ├── controller/      # REST controllers
│   │       ├── entity/          # JPA entities
│   │       ├── repository/      # Data repositories
│   │       ├── service/         # Business logic
│   │       └── security/        # JWT security
│   └── pom.xml
└── README.md
```

## Prerequisites

- Node.js 18+ and npm
- Java 24 (OpenJDK)
- PostgreSQL 12+
- Maven (optional, can use IDE)

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL
2. Create a new database:
   ```sql
   CREATE DATABASE exam_management;
   ```
3. Update database credentials in `backend/src/main/resources/application.properties`

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Open the project in IntelliJ IDEA
   - File → Open → Select the `backend` folder
   - IntelliJ will automatically detect it as a Maven project
   - Wait for dependencies to download

3. Run the application:
   - Right-click on `ExamManagementApplication.java`
   - Select "Run 'ExamManagementApplication'"
   - Or use the green play button

4. The backend will start on `http://localhost:8080`

5. Access Swagger UI: `http://localhost:8080/swagger-ui.html`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Exams
- `GET /api/exams` - Get all exams
- `POST /api/exams` - Create exam
- `PUT /api/exams/{id}` - Update exam
- `DELETE /api/exams/{id}` - Delete exam

### Results
- `GET /api/results` - Get results (role-based)
- `POST /api/results` - Create result
- `PUT /api/results/{id}` - Update result
- `DELETE /api/results/{id}` - Delete result

## Default Users

The system will create default users on first run:

- **Admin**: admin/admin123
- **Faculty**: faculty/faculty123  
- **Student**: student/student123

## Development

### Frontend Development
- Uses Vite for fast development
- Hot module replacement enabled
- Tailwind CSS for styling
- Redux Toolkit for state management

### Backend Development
- Spring Boot DevTools enabled
- Auto-reload on code changes
- JPA/Hibernate for database operations
- JWT-based authentication

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
mvn clean package
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change ports in configuration files
2. **Database connection**: Verify PostgreSQL is running and credentials are correct
3. **JWT errors**: Check JWT secret in application.properties
4. **CORS issues**: Verify CORS configuration in SecurityConfig

### Logs
- Frontend: Check browser console
- Backend: Check IntelliJ console or application logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

# AI InternMatch - Internship Application Platform

## Overview

AI InternMatch is a full-stack web application that helps students find and apply for internships using AI-powered resume analysis and job matching. The platform allows users to upload their resumes, get detailed analysis with ATS scores, browse available internships, and track their applications.

The system features a React frontend built with modern UI components (shadcn/ui), an Express.js backend with RESTful APIs, and PostgreSQL database integration through Drizzle ORM. The application includes resume parsing, AI-powered job matching, and comprehensive application management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **File Upload**: Multer for handling PDF resume uploads
- **PDF Processing**: Mock PDF text extraction (placeholder for pdf-parse integration)
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Build System**: ESBuild for production builds, TSX for development

### Database Design
- **Users**: Authentication and profile management
- **Resumes**: File storage with extracted content, skills, and analysis scores
- **Internships**: Job listings with requirements, skills, and company details
- **Applications**: Tracking application status and user-internship relationships
- **Resume Analysis**: AI-powered analysis results and matching scores

### Data Storage Strategy
- **Development**: In-memory storage with sample data for rapid prototyping
- **Production**: PostgreSQL database with Drizzle migrations
- **File Storage**: Local filesystem for resume uploads (uploads/ directory)
- **Session Storage**: PostgreSQL-backed sessions for user authentication

### API Architecture
- RESTful endpoints for CRUD operations
- Structured error handling with proper HTTP status codes
- File upload endpoints with validation (PDF only, 10MB limit)
- Search and filtering capabilities for internships
- Application status tracking and statistics

### Key Features
- **Resume Upload & Analysis**: PDF parsing with ATS scoring and skill extraction
- **Job Matching**: AI-powered matching based on resume content and job requirements
- **Application Tracking**: Status management with detailed application history
- **Search & Filtering**: Advanced internship search with location and industry filters
- **Responsive Design**: Mobile-first design with comprehensive component library

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migrations and schema management

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library

### Development Tools
- **vite**: Frontend build tool and development server
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **typescript**: Type safety across the application
- **@tanstack/react-query**: Server state management and caching

### File Processing
- **multer**: File upload middleware for Express
- **connect-pg-simple**: PostgreSQL session store

### Form Management
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation

### Additional Libraries
- **date-fns**: Date manipulation and formatting
- **wouter**: Lightweight React router
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel component
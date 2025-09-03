import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertResumeSchema, insertApplicationSchema, insertResumeAnalysisSchema } from "@shared/schema";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

// Simple PDF text extraction (mock implementation)
async function extractTextFromPDF(filePath: string): Promise<string> {
  // In a real implementation, you would use a library like pdf-parse
  // For now, return mock extracted text
  return `John Doe
Software Engineer
Email: john.doe@email.com
Phone: (555) 123-4567

EXPERIENCE
Software Developer Intern | TechCorp | Summer 2023
- Developed web applications using React and Node.js
- Improved website performance by 40%
- Collaborated with cross-functional teams

EDUCATION
Bachelor of Science in Computer Science
University of Technology | Expected May 2024
GPA: 3.7/4.0

SKILLS
Programming Languages: JavaScript, Python, Java, C++
Frameworks: React, Node.js, Express.js, Django
Tools: Git, Docker, AWS, MongoDB
Other: Agile Development, REST APIs, Database Design`;
}

// Simple skill extraction
function extractSkills(text: string): string[] {
  const skillKeywords = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Express.js',
    'Django', 'Git', 'Docker', 'AWS', 'MongoDB', 'SQL', 'HTML', 'CSS',
    'TypeScript', 'Angular', 'Vue.js', 'PostgreSQL', 'MySQL', 'Redis',
    'Kubernetes', 'Jenkins', 'Agile', 'Scrum', 'REST', 'GraphQL', 'TensorFlow',
    'Machine Learning', 'Data Science', 'Analytics', 'Figma', 'Sketch'
  ];

  return skillKeywords.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
}

// Simple experience extraction
function extractExperience(text: string): string[] {
  const experienceSection = text.match(/EXPERIENCE([\s\S]*?)(?=EDUCATION|SKILLS|$)/i);
  if (experienceSection) {
    return experienceSection[1].split('\n').filter(line => line.trim().length > 0);
  }
  return [];
}

// Simple education extraction
function extractEducation(text: string): string[] {
  const educationSection = text.match(/EDUCATION([\s\S]*?)(?=EXPERIENCE|SKILLS|$)/i);
  if (educationSection) {
    return educationSection[1].split('\n').filter(line => line.trim().length > 0);
  }
  return [];
}

// Calculate ATS score
function calculateATSScore(skills: string[], experience: string[], education: string[]): number {
  let score = 0;
  
  // Skills contribution (40%)
  score += Math.min(skills.length * 5, 40);
  
  // Experience contribution (40%)
  score += Math.min(experience.length * 8, 40);
  
  // Education contribution (20%)
  score += Math.min(education.length * 10, 20);
  
  return Math.min(score, 100);
}

// Generate resume analysis suggestions
function generateSuggestions(skills: string[], experience: string[], atsScore: number) {
  const suggestions = [];

  if (atsScore < 60) {
    suggestions.push({
      type: 'critical',
      title: 'Add Quantified Achievements',
      description: 'Replace generic statements with specific, measurable accomplishments. For example: "Improved website performance by 40%, reducing load time from 3.2s to 1.9s"',
      priority: 'high'
    });
  }

  if (skills.length < 8) {
    suggestions.push({
      type: 'improvement',
      title: 'Enhance Technical Skills Section',
      description: 'Add more relevant technical skills that match industry requirements. Consider adding cloud platforms, frameworks, and tools.',
      priority: 'medium'
    });
  }

  if (experience.length < 3) {
    suggestions.push({
      type: 'enhancement',
      title: 'Highlight More Experience',
      description: 'Include internships, projects, and relevant coursework to demonstrate your practical experience.',
      priority: 'medium'
    });
  }

  suggestions.push({
    type: 'optimization',
    title: 'Improve ATS Compatibility',
    description: 'Use standard section headers and keywords that applicant tracking systems can easily parse.',
    priority: 'low'
  });

  return suggestions;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Resume upload endpoint
  app.post("/api/resumes/upload", upload.single('resume'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const userId = req.body.userId || "default-user"; // In real app, get from session
      
      // Extract text from PDF
      const extractedText = await extractTextFromPDF(req.file.path);
      
      // Extract structured data
      const skills = extractSkills(extractedText);
      const experience = extractExperience(extractedText);
      const education = extractEducation(extractedText);
      const analysisScore = calculateATSScore(skills, experience, education);
      
      // Create resume record
      const resumeData = {
        userId,
        fileName: req.file.originalname,
        filePath: req.file.path,
        content: extractedText,
        skills,
        experience,
        education,
        analysisScore,
        keywords: skills, // Use skills as keywords for now
      };

      const resume = await storage.createResume(resumeData);
      
      // Generate analysis
      const suggestions = generateSuggestions(skills, experience, analysisScore);
      const analysisData = {
        resumeId: resume.id,
        missingKeywords: [],
        suggestions,
        technicalSkillsScore: Math.min(skills.length * 10, 100),
        experienceScore: Math.min(experience.length * 15, 100),
        achievementsScore: analysisScore > 70 ? 80 : 40,
        overallScore: analysisScore,
      };

      await storage.createResumeAnalysis(analysisData);

      res.json({ 
        resume,
        analysis: {
          score: analysisScore,
          suggestions: suggestions.slice(0, 3), // Return top 3 suggestions
          skills,
          experience: experience.length,
          education: education.length
        }
      });
    } catch (error) {
      console.error("Resume upload error:", error);
      res.status(500).json({ message: "Failed to process resume" });
    }
  });

  // Get user resumes
  app.get("/api/resumes", async (req, res) => {
    try {
      const userId = req.query.userId as string || "default-user";
      const resumes = await storage.getResumesByUserId(userId);
      res.json(resumes);
    } catch (error) {
      console.error("Get resumes error:", error);
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  // Get resume analysis
  app.get("/api/resumes/:id/analysis", async (req, res) => {
    try {
      const resumeId = req.params.id;
      const internshipId = req.query.internshipId as string;
      
      const analysis = await storage.getResumeAnalysis(resumeId, internshipId);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ message: "Failed to fetch analysis" });
    }
  });

  // Get all internships
  app.get("/api/internships", async (req, res) => {
    try {
      const query = req.query.q as string;
      const location = req.query.location as string;
      const industry = req.query.industry as string;
      
      let internships;
      if (query || location || industry) {
        internships = await storage.searchInternships(query, location, industry);
      } else {
        internships = await storage.getAllInternships();
      }
      
      res.json(internships);
    } catch (error) {
      console.error("Get internships error:", error);
      res.status(500).json({ message: "Failed to fetch internships" });
    }
  });

  // Get matching internships for a resume
  app.get("/api/internships/matches/:resumeId", async (req, res) => {
    try {
      const resumeId = req.params.resumeId;
      const matchingInternships = await storage.getMatchingInternships(resumeId);
      res.json(matchingInternships);
    } catch (error) {
      console.error("Get matches error:", error);
      res.status(500).json({ message: "Failed to fetch matching internships" });
    }
  });

  // Get internship by id
  app.get("/api/internships/:id", async (req, res) => {
    try {
      const internshipId = req.params.id;
      const internship = await storage.getInternshipById(internshipId);
      
      if (!internship) {
        return res.status(404).json({ message: "Internship not found" });
      }
      
      res.json(internship);
    } catch (error) {
      console.error("Get internship error:", error);
      res.status(500).json({ message: "Failed to fetch internship" });
    }
  });

  // Create application
  app.post("/api/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      
      // Calculate match score if resume exists
      const resume = await storage.getResumeById(applicationData.resumeId);
      const internship = await storage.getInternshipById(applicationData.internshipId);
      
      let matchScore = 0;
      if (resume && internship && resume.skills && internship.skills) {
        const matchedSkills = internship.skills.filter(skill =>
          resume.skills!.some(userSkill => 
            userSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        matchScore = Math.round((matchedSkills.length / internship.skills.length) * 100);
      }

      const application = await storage.createApplication({
        ...applicationData,
        matchScore,
      });

      res.json(application);
    } catch (error) {
      console.error("Create application error:", error);
      res.status(500).json({ message: "Failed to create application" });
    }
  });

  // Get user applications
  app.get("/api/applications", async (req, res) => {
    try {
      const userId = req.query.userId as string || "default-user";
      const applications = await storage.getApplicationsByUserId(userId);
      res.json(applications);
    } catch (error) {
      console.error("Get applications error:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // Update application status
  app.patch("/api/applications/:id", async (req, res) => {
    try {
      const applicationId = req.params.id;
      const { status } = req.body;
      
      const updatedApplication = await storage.updateApplicationStatus(applicationId, status);
      if (!updatedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      res.json(updatedApplication);
    } catch (error) {
      console.error("Update application error:", error);
      res.status(500).json({ message: "Failed to update application" });
    }
  });

  // Get application statistics
  app.get("/api/applications/stats", async (req, res) => {
    try {
      const userId = req.query.userId as string || "default-user";
      const applications = await storage.getApplicationsByUserId(userId);
      
      const stats = {
        total: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        underReview: applications.filter(app => app.status === 'under_review').length,
        interviews: applications.filter(app => app.status === 'interview').length,
        accepted: applications.filter(app => app.status === 'accepted').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
        responseRate: applications.length > 0 ? 
          Math.round(((applications.length - applications.filter(app => app.status === 'pending').length) / applications.length) * 100) : 0
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

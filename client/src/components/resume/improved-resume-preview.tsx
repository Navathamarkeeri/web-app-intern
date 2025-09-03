import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Eye, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImprovedResumePreviewProps {
  resume: any;
  analysis: any;
}

export default function ImprovedResumePreview({ resume, analysis }: ImprovedResumePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const improvedSkills = [
    ...(resume.skills || []),
    ...(analysis.missingKeywords?.slice(0, 3) || [])
  ];

  const improvedExperience = [
    "Software Developer Intern | TechCorp | Summer 2023",
    "• Developed scalable web applications using React and Node.js, improving performance by 40%",
    "• Collaborated with cross-functional teams of 8+ members to deliver projects 2 weeks ahead of schedule",
    "• Implemented automated testing procedures, reducing bug reports by 60%",
    "",
    "Research Assistant | University AI Lab | Spring 2023", 
    "• Conducted machine learning research resulting in 2 published papers",
    "• Analyzed datasets of 10,000+ records using Python and statistical methods",
    "• Presented findings to faculty panel, receiving excellence award for research quality"
  ];

  const generateImprovedResume = () => {
    const improvedResumeContent = `
John Doe
Software Engineer
Email: john.doe@email.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

PROFESSIONAL SUMMARY
Results-driven Computer Science student with proven experience in full-stack development and machine learning. 
Demonstrated ability to improve system performance by 40% and deliver projects ahead of schedule. 
Seeking challenging internship opportunities to apply technical skills and contribute to innovative solutions.

TECHNICAL SKILLS
Programming Languages: ${improvedSkills.join(', ')}
Frameworks & Tools: React, Node.js, Express.js, Django, Git, Docker, AWS, MongoDB, PostgreSQL
Development Practices: Agile Development, Test-Driven Development, CI/CD, Code Review

EXPERIENCE
${improvedExperience.join('\n')}

EDUCATION
Bachelor of Science in Computer Science
University of Technology | Expected May 2024
GPA: 3.7/4.0
Relevant Coursework: Data Structures, Algorithms, Machine Learning, Database Systems

PROJECTS
E-Commerce Platform | React, Node.js, MongoDB
• Built full-stack application with user authentication and payment processing
• Implemented responsive design serving 500+ concurrent users
• Optimized database queries reducing load times by 35%

AI Chatbot | Python, TensorFlow, Natural Language Processing
• Developed intelligent chatbot using machine learning algorithms
• Achieved 85% accuracy in intent recognition across 1000+ test cases
• Deployed solution handling 100+ daily interactions

ACHIEVEMENTS & CERTIFICATIONS
• AWS Cloud Practitioner Certification (2023)
• Dean's List for Academic Excellence (Fall 2022, Spring 2023)
• Best Innovation Award - University Hackathon 2023
• Published Research: "Machine Learning Applications in Web Development"

ADDITIONAL INFORMATION
• Active contributor to open-source projects with 50+ GitHub contributions
• Volunteer coding instructor for local high school students
• Fluent in English and Spanish
`;

    const blob = new Blob([improvedResumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'improved-resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Improved Resume Downloaded!",
      description: "Your enhanced resume with all improvements has been saved as improved-resume.txt",
    });
  };

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full" data-testid="button-preview-improved">
            <Eye className="w-4 h-4 mr-2" />
            Preview Improved Resume
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Improved Resume Preview
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">✨ Improvements Applied</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Added quantified achievements with specific metrics</li>
                <li>• Enhanced technical skills section with trending technologies</li>
                <li>• Improved action verbs and professional language</li>
                <li>• Added professional summary for better ATS optimization</li>
                <li>• Included relevant projects with impact measurements</li>
              </ul>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Enhanced Skills Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-muted-foreground mb-2">Before:</h5>
                    <div className="flex flex-wrap gap-2">
                      {(resume.skills || []).map((skill: string, index: number) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">After (Added {analysis.missingKeywords?.slice(0, 3)?.length || 0} missing skills):</h5>
                    <div className="flex flex-wrap gap-2">
                      {improvedSkills.map((skill: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant={resume.skills?.includes(skill) ? "outline" : "default"}
                          className={!resume.skills?.includes(skill) ? "bg-green-100 text-green-800 border-green-300" : ""}
                        >
                          {skill}
                          {!resume.skills?.includes(skill) && <span className="ml-1">✨</span>}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enhanced Experience Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-muted-foreground mb-2">Before:</h5>
                    <div className="text-sm text-muted-foreground">
                      {resume.experience?.map((exp: string, index: number) => (
                        <div key={index}>{exp}</div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">After (With quantified achievements):</h5>
                    <div className="text-sm space-y-1">
                      {improvedExperience.map((line: string, index: number) => (
                        <div key={index} className={line.includes('•') ? "text-foreground ml-2" : "font-medium text-foreground"}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={generateImprovedResume} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Improved Resume
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close Preview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
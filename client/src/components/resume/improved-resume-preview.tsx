import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Eye, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

interface ImprovedResumePreviewProps {
  resume: any;
  analysis: any;
}

export default function ImprovedResumePreview({ resume, analysis }: ImprovedResumePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conciseMode, setConciseMode] = useState(true);
  const { toast } = useToast();

  const improvedSkills = [
    ...(resume?.skills || []),
    ...(analysis?.missingKeywords?.slice(0, 3) || [])
  ];

  const originalExperience: string[] = Array.isArray(resume?.experience) ? resume.experience : [];
  const improvedExperience: string[] = originalExperience.length > 0
    ? originalExperience.map((line: string) => line.trim().startsWith("•") ? line : (line.trim() ? `• ${line.trim()}` : line))
    : [
        "• Add role, company, dates (e.g., Software Intern | TechCorp | Summer 2024)",
        "• Use quantified results (e.g., improved load time by 35%)",
        "• Highlight tools/tech used (React, Node.js, SQL)",
      ];

  const originalEducation: string[] = Array.isArray(resume?.education) ? resume.education : [];
  const educationBlock: string = originalEducation.length > 0
    ? originalEducation.join("\n")
    : "Bachelor of Science | Your University | Expected Graduation: YYYY\nRelevant Coursework: Data Structures, Algorithms, Databases";

  const nameFromFile = (resume?.fileName || "Your Name").replace(/\.[^/.]+$/, "");

  const generateImprovedResumeText = () => {
    return `
${nameFromFile}
Aspiring ${improvedSkills.includes('Data Science') ? 'Data Scientist' : 'Software Engineer'}
Email: your.email@example.com | Phone: (555) 123-4567
LinkedIn: your-linkedin | GitHub: your-github

PROFESSIONAL SUMMARY
Results-driven student with hands-on experience in ${improvedSkills.slice(0,5).join(', ')}. 
Demonstrated ability to deliver impact with measurable outcomes. 
Seeking internship opportunities to apply technical skills and contribute to real-world projects.

TECHNICAL SKILLS
Programming Languages: ${improvedSkills.join(', ')}
Frameworks & Tools: React, Node.js, Express.js, Django, Git, Docker, AWS, MongoDB, PostgreSQL
Development Practices: Agile Development, Test-Driven Development, CI/CD, Code Review

EXPERIENCE
${improvedExperience.join('\n')}

EDUCATION
${educationBlock}

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
  };

  const downloadImprovedResumePdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const left = 40;
    const top = 50;
    const maxWidth = 515; // A4 width (595pt) - margins

    const title = `${nameFromFile} — ${improvedSkills.includes('Data Science') ? 'Data Scientist' : 'Software Engineer'}`;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(title, left, top);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const contact = 'Email: your.email@example.com | Phone: (555) 123-4567\nLinkedIn: your-linkedin | GitHub: your-github';
    doc.text(doc.splitTextToSize(contact, maxWidth), left, top + 18);

    let cursorY = top + 60;

    function section(heading: string, body: string) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(heading, left, cursorY);
      cursorY += 16;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(body, maxWidth);
      doc.text(lines, left, cursorY);
      cursorY += (lines.length * 12) + 10;
      if (cursorY > 800) {
        doc.addPage();
        cursorY = 50;
      }
    }

    section('Professional Summary', 'Results-driven Computer Science student with proven experience in full-stack development and machine learning. Demonstrated ability to improve system performance by 40% and deliver projects ahead of schedule. Seeking challenging internship opportunities to apply technical skills and contribute to innovative solutions.');

    section('Technical Skills', `Programming Languages: ${improvedSkills.join(', ')}\nFrameworks & Tools: React, Node.js, Express.js, Django, Git, Docker, AWS, MongoDB, PostgreSQL\nDevelopment Practices: Agile Development, Test-Driven Development, CI/CD, Code Review`);

    section('Experience', improvedExperience.join('\n'));

    section('Education', educationBlock);

    section('Projects', 'E-Commerce Platform | React, Node.js, MongoDB\n• Built full-stack application with user authentication and payment processing\n• Implemented responsive design serving 500+ concurrent users\n• Optimized database queries reducing load times by 35%\n\nAI Chatbot | Python, TensorFlow, Natural Language Processing\n• Developed intelligent chatbot using machine learning algorithms\n• Achieved 85% accuracy in intent recognition across 1000+ test cases\n• Deployed solution handling 100+ daily interactions');

    section('Achievements & Certifications', '• AWS Cloud Practitioner Certification (2023)\n• Dean\'s List for Academic Excellence (Fall 2022, Spring 2023)\n• Best Innovation Award - University Hackathon 2023\n• Published Research: "Machine Learning Applications in Web Development"');

    section('Additional Information', '• Active contributor to open-source projects with 50+ GitHub contributions\n• Volunteer coding instructor for local high school students\n• Fluent in English and Spanish');

    doc.save('improved-resume.pdf');

    toast({
      title: "Improved Resume Downloaded!",
      description: "Saved as improved-resume.pdf",
    });
  };

  const openPdfPreview = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const left = 40;
    const top = 50;
    const maxWidth = 515;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`${nameFromFile} — ${improvedSkills.includes('Data Science') ? 'Data Scientist' : 'Software Engineer'}`, left, top);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize('Email: your.email@example.com | Phone: (555) 123-4567\nLinkedIn: your-linkedin | GitHub: your-github', maxWidth), left, top + 18);

    let cursorY = top + 60;
    function section(heading: string, body: string) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(heading, left, cursorY);
      cursorY += 16;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(body, maxWidth);
      doc.text(lines, left, cursorY);
      cursorY += (lines.length * 12) + 10;
      if (cursorY > 800) {
        doc.addPage();
        cursorY = 50;
      }
    }

    section('Professional Summary', 'Results-driven Computer Science student with proven experience in full-stack development and machine learning. Demonstrated ability to improve system performance by 40% and deliver projects ahead of schedule. Seeking challenging internship opportunities to apply technical skills and contribute to innovative solutions.');
    section('Technical Skills', `Programming Languages: ${improvedSkills.join(', ')}\nFrameworks & Tools: React, Node.js, Express.js, Django, Git, Docker, AWS, MongoDB, PostgreSQL\nDevelopment Practices: Agile Development, Test-Driven Development, CI/CD, Code Review`);
    section('Experience', improvedExperience.join('\n'));

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
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
              <Button variant="outline" onClick={() => setConciseMode(!conciseMode)}>
                {conciseMode ? 'Switch to Detailed' : 'Switch to Concise'}
              </Button>
              <Button onClick={downloadImprovedResumePdf} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download as PDF
              </Button>
              <Button variant="secondary" onClick={openPdfPreview} className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Open PDF Preview
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
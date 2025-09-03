import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ResumeUploadArea from "@/components/resume/upload-area";
import AnalysisCard from "@/components/resume/analysis-card";
import ApplicationStats from "@/components/applications/application-stats";

export default function Home() {
  const [uploadedResume, setUploadedResume] = useState(null);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/10 py-16" data-testid="section-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Find Your Perfect Internship with <span className="text-primary">AI-Powered Matching</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Upload your resume, discover opportunities that match your skills, and get AI-powered suggestions to optimize your applications. Stop applying blindly and start landing interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8" data-testid="button-upload-start">
                <i className="fas fa-upload mr-2"></i>
                Upload Resume & Start Matching
              </Button>
              <Link href="/jobs">
                <Button variant="outline" size="lg" className="px-8" data-testid="button-browse-jobs">
                  <i className="fas fa-search mr-2"></i>
                  Browse Internships
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card" data-testid="section-stats">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-stat-internships">2,500+</div>
              <div className="text-muted-foreground">Active Internships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-stat-accuracy">95%</div>
              <div className="text-muted-foreground">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-stat-students">10,000+</div>
              <div className="text-muted-foreground">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-stat-response">48hrs</div>
              <div className="text-muted-foreground">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Upload Section */}
      <section className="py-16" data-testid="section-resume-upload">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Upload Your Resume for AI Analysis</h3>
              <p className="text-lg text-muted-foreground">Get instant compatibility scores and optimization suggestions</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ResumeUploadArea onUploadSuccess={setUploadedResume} />
              <AnalysisCard resume={uploadedResume} />
            </div>
          </div>
        </div>
      </section>

      {/* Application Dashboard Preview */}
      <section className="py-16 bg-muted/30" data-testid="section-dashboard-preview">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Track Your Progress</h3>
              <p className="text-lg text-muted-foreground">Monitor your applications and see how you're performing</p>
            </div>
            
            <ApplicationStats />
            
            <div className="text-center mt-8">
              <Link href="/applications">
                <Button variant="outline" data-testid="button-view-all-applications">
                  View Full Dashboard <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

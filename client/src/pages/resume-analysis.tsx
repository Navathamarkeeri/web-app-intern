import { useQuery } from "@tanstack/react-query";
import { useRoute, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, FileText, TrendingUp, Target } from "lucide-react";
import SuggestionsCard from "@/components/optimization/suggestions-card";

export default function ResumeAnalysis() {
  const [match, params] = useRoute("/resume-analysis/:resumeId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const resumeId = params?.resumeId;

  const { data: resume, isLoading: resumeLoading } = useQuery({
    queryKey: [`/api/resumes/${resumeId}`],
    queryFn: async () => {
      const response = await fetch(`/api/resumes?userId=default-user`);
      if (!response.ok) throw new Error('Failed to fetch resume');
      const resumes = await response.json();
      return resumes.find((r: any) => r.id === resumeId);
    },
    enabled: !!resumeId,
  });

  const { data: analysis, isLoading: analysisLoading } = useQuery({
    queryKey: [`/api/resumes/${resumeId}/analysis`],
    queryFn: async () => {
      const response = await fetch(`/api/resumes/${resumeId}/analysis`);
      if (!response.ok) throw new Error('Failed to fetch analysis');
      return response.json();
    },
    enabled: !!resumeId,
  });

  if (!match) return null;

  const isLoading = resumeLoading || analysisLoading;

  if (isLoading) {
    return (
      <div className="py-16 min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-card rounded-lg p-6 h-64"></div>
                  <div className="bg-card rounded-lg p-6 h-48"></div>
                </div>
                <div className="bg-card rounded-lg p-6 h-96"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resume || !analysis) {
    return (
      <div className="py-16 min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive mb-4">Analysis Not Found</h2>
              <p className="text-muted-foreground">The resume analysis you're looking for doesn't exist.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleDownloadResume = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${resume.fileName}...`,
    });
    // In a real app, this would download the actual resume file
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#'; // In real app, this would be the actual file URL
      link.download = resume.fileName;
      link.click();
    }, 500);
  };

  const handleUploadNew = () => {
    setLocation('/');
    setTimeout(() => {
      const uploadSection = document.getElementById('resume-upload-section');
      uploadSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShareAnalysis = async () => {
    const analysisUrl = `${window.location.origin}/resume-analysis/${resumeId}`;
    
    try {
      await navigator.clipboard.writeText(analysisUrl);
      toast({
        title: "Analysis Link Copied!",
        description: "Share this link to let others view your resume analysis results.",
      });
    } catch (err) {
      toast({
        title: "Share Analysis",
        description: `Copy this link: ${analysisUrl}`,
      });
    }
  };

  return (
    <div className="py-16 min-h-screen bg-muted/30" data-testid="page-resume-analysis">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-6" data-testid="button-back-to-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="title-resume-analysis">
              Resume Analysis Report
            </h1>
            <p className="text-lg text-muted-foreground">
              Detailed analysis for <span className="font-medium">{resume.fileName}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Analysis Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overall Score */}
              <Card data-testid="card-overall-score">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Overall ATS Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysis.overallScore || 0)}`}>
                      {analysis.overallScore || 0}%
                    </div>
                    <p className="text-muted-foreground">Your resume scored {analysis.overallScore || 0} out of 100</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 mb-4">
                    <div 
                      className={`h-4 rounded-full progress-bar ${getProgressColor(analysis.overallScore || 0)}`}
                      style={{ width: `${analysis.overallScore || 0}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="text-2xl font-bold text-red-600">0-59</div>
                      <div className="text-muted-foreground">Needs Work</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">60-79</div>
                      <div className="text-muted-foreground">Good</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">80-100</div>
                      <div className="text-muted-foreground">Excellent</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Scores */}
              <Card data-testid="card-detailed-scores">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Detailed Score Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Technical Skills</span>
                      <span className="font-bold">{analysis.technicalSkillsScore || 0}%</span>
                    </div>
                    <Progress value={analysis.technicalSkillsScore || 0} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on {resume.skills?.length || 0} technical skills identified
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Experience</span>
                      <span className="font-bold">{analysis.experienceScore || 0}%</span>
                    </div>
                    <Progress value={analysis.experienceScore || 0} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on {resume.experience?.length || 0} experience entries
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Achievements</span>
                      <span className="font-bold">{analysis.achievementsScore || 0}%</span>
                    </div>
                    <Progress value={analysis.achievementsScore || 0} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Quality and impact of achievements listed
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Analysis */}
              <Card data-testid="card-skills-analysis">
                <CardHeader>
                  <CardTitle>Skills Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Identified Skills ({resume.skills?.length || 0})</h4>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills?.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-3 text-yellow-600">
                            Recommended Skills to Add ({analysis.missingKeywords.length})
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {analysis.missingKeywords.map((keyword: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-sm border-yellow-300">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Improvement Suggestions */}
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <SuggestionsCard 
                  suggestions={analysis.suggestions} 
                  resume={resume} 
                  analysis={analysis} 
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card data-testid="card-resume-info">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    Resume Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Name</span>
                    <span className="font-medium text-right break-all">{resume.fileName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uploaded</span>
                    <span className="font-medium">{new Date(resume.uploadedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Analysis Score</span>
                    <span className={`font-bold ${getScoreColor(resume.analysisScore || 0)}`}>
                      {resume.analysisScore || 0}%
                    </span>
                  </div>
                  <Separator />
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleDownloadResume}
                    data-testid="button-download-resume"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </CardContent>
              </Card>

              <Card data-testid="card-quick-stats">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skills Found</span>
                    <span className="font-bold">{resume.skills?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience Entries</span>
                    <span className="font-bold">{resume.experience?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Education Entries</span>
                    <span className="font-bold">{resume.education?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Keywords</span>
                    <span className="font-bold">{resume.keywords?.length || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-next-steps">
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/jobs">
                    <Button variant="outline" className="w-full justify-start">
                      <i className="fas fa-search mr-2"></i>
                      Find Matching Jobs
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={handleUploadNew}
                    data-testid="button-upload-new"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload New Version
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={handleShareAnalysis}
                    data-testid="button-share-analysis"
                  >
                    <i className="fas fa-share mr-2"></i>
                    Share Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
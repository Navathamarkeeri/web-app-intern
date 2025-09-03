import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AnalysisCardProps {
  resume?: any;
}

export default function AnalysisCard({ resume }: AnalysisCardProps) {
  const analysis = resume?.analysis;

  if (!analysis) {
    return (
      <div className="bg-card border border-border rounded-lg p-6" data-testid="card-analysis-placeholder">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          <i className="fas fa-chart-line text-primary mr-2"></i>
          Resume Analysis
        </h4>
        
        <div className="text-center py-8">
          <i className="fas fa-upload text-4xl text-muted-foreground mb-4"></i>
          <p className="text-muted-foreground">Upload your resume to see analysis results</p>
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

  return (
    <div className="bg-card border border-border rounded-lg p-6" data-testid="card-resume-analysis">
      <h4 className="text-lg font-semibold text-foreground mb-4">
        <i className="fas fa-chart-line text-primary mr-2"></i>
        Resume Analysis
      </h4>
      
      {/* Overall Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall ATS Score</span>
          <span className={`text-lg font-bold ${getScoreColor(analysis.score)}`} data-testid="text-analysis-score">
            {analysis.score}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full progress-bar ${getProgressColor(analysis.score)}`}
            style={{ width: `${analysis.score}%` }}
          ></div>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <i className="fas fa-check-circle text-green-500"></i>
          <span className="text-sm text-foreground">
            {analysis.skills?.length || 0} technical skills identified
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <i className="fas fa-briefcase text-blue-500"></i>
          <span className="text-sm text-foreground">
            {analysis.experience || 0} experience entries found
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <i className="fas fa-graduation-cap text-purple-500"></i>
          <span className="text-sm text-foreground">
            {analysis.education || 0} education entries found
          </span>
        </div>
        
        {analysis.suggestions && analysis.suggestions.length > 0 && (
          <div className="flex items-center space-x-3">
            <i className="fas fa-lightbulb text-yellow-500"></i>
            <span className="text-sm text-foreground">
              {analysis.suggestions.length} optimization suggestions available
            </span>
          </div>
        )}
      </div>
      
      {resume?.resume?.id ? (
        <Link href={`/resume-analysis/${resume.resume.id}`}>
          <Button className="w-full" data-testid="button-detailed-analysis">
            <i className="fas fa-eye mr-2"></i>
            View Detailed Analysis
          </Button>
        </Link>
      ) : (
        <Button className="w-full" disabled data-testid="button-detailed-analysis">
          <i className="fas fa-eye mr-2"></i>
          View Detailed Analysis
        </Button>
      )}
    </div>
  );
}

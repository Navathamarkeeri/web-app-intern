import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Internship, InternshipWithMatch } from "@shared/schema";

interface JobCardProps {
  internship: Internship | InternshipWithMatch;
}

export default function JobCard({ internship }: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const applyMutation = useMutation({
    mutationFn: async () => {
      // For demo purposes, using default values
      const applicationData = {
        userId: 'default-user',
        internshipId: internship.id,
        resumeId: 'default-resume', // In real app, get from user's uploaded resume
        status: 'pending',
        coverLetter: '',
      };

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) throw new Error('Application failed');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted!",
        description: `Your application to ${internship.company} has been submitted successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
    },
    onError: () => {
      toast({
        title: "Application failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const matchScore = 'matchScore' in internship ? internship.matchScore : undefined;
  
  const getMatchScoreClass = (score?: number) => {
    if (!score) return "match-score-low";
    if (score >= 80) return "match-score-high";
    if (score >= 60) return "match-score-medium";
    return "match-score-low";
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: `${internship.title} at ${internship.company}`,
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow" data-testid={`card-job-${internship.id}`}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <i className={`${internship.companyLogo || 'fas fa-building'} text-primary text-xl`}></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground" data-testid={`text-job-title-${internship.id}`}>
                  {internship.title}
                </h4>
                <p className="text-muted-foreground" data-testid={`text-company-${internship.id}`}>
                  {internship.company}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <span>
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {internship.location}
                  </span>
                  {internship.duration && (
                    <span>
                      <i className="fas fa-clock mr-1"></i>
                      {internship.duration}
                    </span>
                  )}
                  {internship.salary && (
                    <span>
                      <i className="fas fa-dollar-sign mr-1"></i>
                      {internship.salary}
                    </span>
                  )}
                  {internship.isRemote && (
                    <Badge variant="secondary">Remote</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {matchScore && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreClass(matchScore)}`} data-testid={`text-match-score-${internship.id}`}>
                  <i className="fas fa-chart-line mr-1"></i>
                  {matchScore}% Match
                </div>
              )}
              <button
                onClick={toggleBookmark}
                className="text-muted-foreground hover:text-primary"
                data-testid={`button-bookmark-${internship.id}`}
              >
                <i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark`}></i>
              </button>
            </div>
          </div>
          
          <p className="text-foreground mb-4" data-testid={`text-description-${internship.id}`}>
            {internship.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {(internship.skills || []).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-sm"
                data-testid={`badge-skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${internship.id}`}
              >
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground" data-testid={`text-posted-date-${internship.id}`}>
              Posted {formatDate(internship.postedAt || new Date())}
            </span>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                data-testid={`button-view-details-${internship.id}`}
              >
                View Details
              </Button>
              <Button
                onClick={() => applyMutation.mutate()}
                disabled={applyMutation.isPending}
                data-testid={`button-quick-apply-${internship.id}`}
              >
                {applyMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Applying...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Quick Apply
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

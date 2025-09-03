import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ApplicationWithDetails } from "@shared/schema";

interface ApplicationListProps {
  applications: ApplicationWithDetails[];
}

export default function ApplicationList({ applications }: ApplicationListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview':
        return 'bg-green-100 text-green-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'interview':
        return 'Interview Scheduled';
      case 'under_review':
        return 'Under Review';
      case 'pending':
        return 'Application Sent';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Applied 1 day ago";
    if (diffDays < 7) return `Applied ${diffDays} days ago`;
    if (diffDays < 14) return "Applied 1 week ago";
    return `Applied ${Math.floor(diffDays / 7)} weeks ago`;
  };

  if (applications.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center" data-testid="text-no-applications">
        <i className="fas fa-inbox text-4xl text-muted-foreground mb-4"></i>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Applications Yet</h3>
        <p className="text-muted-foreground mb-6">
          Start applying to internships to see your applications here.
        </p>
        <Link href="/jobs">
          <Button data-testid="button-browse-internships-empty">
            <i className="fas fa-search mr-2"></i>
            Browse Internships
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden" data-testid="list-applications">
      <div className="p-6 border-b border-border">
        <h4 className="text-lg font-semibold text-foreground">Recent Applications</h4>
      </div>
      
      <div className="divide-y divide-border">
        {applications.map((application) => (
          <div 
            key={application.id} 
            className="p-6 hover:bg-muted/50 transition-colors"
            data-testid={`item-application-${application.id}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className={`${application.internship.companyLogo || 'fas fa-building'} text-primary`}></i>
                </div>
                <div>
                  <h5 className="font-medium text-foreground" data-testid={`text-application-title-${application.id}`}>
                    {application.internship.title}
                  </h5>
                  <p className="text-sm text-muted-foreground" data-testid={`text-application-company-${application.id}`}>
                    {application.internship.company}
                  </p>
                  {application.matchScore && (
                    <p className="text-xs text-muted-foreground">
                      {application.matchScore}% match
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge 
                  className={`text-sm font-medium ${getStatusColor(application.status)}`}
                  data-testid={`badge-status-${application.id}`}
                >
                  {getStatusText(application.status)}
                </Badge>
                <span className="text-sm text-muted-foreground" data-testid={`text-application-date-${application.id}`}>
                  {formatDate(application.appliedAt || new Date())}
                </span>
                <button 
                  className="text-muted-foreground hover:text-primary"
                  data-testid={`button-view-application-${application.id}`}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {applications.length > 5 && (
        <div className="p-6 text-center border-t border-border">
          <Button variant="ghost" data-testid="button-view-all-applications">
            View All Applications <i className="fas fa-arrow-right ml-1"></i>
          </Button>
        </div>
      )}
    </div>
  );
}

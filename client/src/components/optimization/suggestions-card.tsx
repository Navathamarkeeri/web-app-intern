import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Suggestion {
  type: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface SuggestionsCardProps {
  suggestions: Suggestion[];
}

export default function SuggestionsCard({ suggestions }: SuggestionsCardProps) {
  const { toast } = useToast();

  const handleApplySuggestion = (suggestion: Suggestion, index: number) => {
    toast({
      title: "Suggestion Applied!",
      description: `Applied: ${suggestion.title}. Your resume has been updated with this improvement.`,
    });
  };

  const handleDownloadImproved = () => {
    toast({
      title: "Download Started",
      description: "Your improved resume with all suggestions applied is being prepared for download.",
    });
    // In a real app, this would generate and download the improved resume
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#'; // In real app, this would be the actual file URL
      link.download = 'improved-resume.pdf';
      link.click();
    }, 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-200 text-red-900';
      case 'medium':
        return 'bg-yellow-100 border-yellow-200 text-yellow-900';
      case 'low':
        return 'bg-blue-100 border-blue-200 text-blue-900';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-900';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return 'fas fa-exclamation-triangle text-red-600';
      case 'improvement':
        return 'fas fa-arrow-up text-green-600';
      case 'enhancement':
        return 'fas fa-star text-purple-600';
      case 'optimization':
        return 'fas fa-cog text-blue-600';
      default:
        return 'fas fa-lightbulb text-yellow-500';
    }
  };

  return (
    <Card data-testid="card-suggestions">
      <CardHeader>
        <CardTitle className="flex items-center">
          <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
          Improvement Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
              data-testid={`suggestion-${index}`}
            >
              <div className="flex items-start space-x-3">
                <i className={`${getIcon(suggestion.type)} mt-1`}></i>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h6 className="font-medium" data-testid={`suggestion-title-${index}`}>
                      {suggestion.title}
                    </h6>
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                      data-testid={`suggestion-priority-${index}`}
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-sm mb-3" data-testid={`suggestion-description-${index}`}>
                    {suggestion.description}
                  </p>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-sm font-medium"
                    onClick={() => handleApplySuggestion(suggestion, index)}
                    data-testid={`button-apply-suggestion-${index}`}
                  >
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleDownloadImproved}
            data-testid="button-download-improved"
          >
            <i className="fas fa-download mr-2"></i>
            Download Improved Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

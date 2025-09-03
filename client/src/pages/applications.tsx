import { useQuery } from "@tanstack/react-query";
import ApplicationStats from "@/components/applications/application-stats";
import ApplicationList from "@/components/applications/application-list";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApplicationWithDetails } from "@shared/schema";

export default function Applications() {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['/api/applications'],
    queryFn: async () => {
      const response = await fetch('/api/applications?userId=default-user');
      if (!response.ok) throw new Error('Failed to fetch applications');
      return response.json() as Promise<ApplicationWithDetails[]>;
    },
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Applications</h2>
          <p className="text-muted-foreground">Please try again later or contact support if the problem persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 min-h-screen" data-testid="page-applications">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="title-application-dashboard">
              Application Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your internship applications and their progress
            </p>
          </div>

          <ApplicationStats />

          {isLoading ? (
            <div className="bg-card border border-border rounded-lg overflow-hidden mt-8">
              <div className="p-6 border-b border-border">
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="divide-y divide-border">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ApplicationList applications={applications || []} />
          )}
        </div>
      </div>
    </div>
  );
}

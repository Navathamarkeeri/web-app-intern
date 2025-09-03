import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import JobFilters from "@/components/jobs/job-filters";
import JobCard from "@/components/jobs/job-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Internship } from "@shared/schema";

export default function Jobs() {
  const [filters, setFilters] = useState({
    query: "",
    location: "",
    industry: "",
  });

  const { data: internships, isLoading, error } = useQuery({
    queryKey: ['/api/internships', filters.query, filters.location, filters.industry],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.query) params.append('q', filters.query);
      if (filters.location && filters.location !== 'All Locations') params.append('location', filters.location);
      if (filters.industry && filters.industry !== 'All Industries') params.append('industry', filters.industry);
      
      const response = await fetch(`/api/internships?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch internships');
      return response.json() as Promise<Internship[]>;
    },
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Internships</h2>
          <p className="text-muted-foreground">Please try again later or contact support if the problem persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-muted/30 min-h-screen" data-testid="page-jobs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="title-discover-internships">
              Discover Matching Internships
            </h1>
            <p className="text-lg text-muted-foreground">AI-powered matching shows you the most relevant opportunities</p>
          </div>
          
          <JobFilters onFilterChange={handleFilterChange} filters={filters} />
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 mt-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded" />
                    <Skeleton className="h-6 w-20 rounded" />
                    <Skeleton className="h-6 w-14 rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex space-x-3">
                      <Skeleton className="h-10 w-24 rounded-md" />
                      <Skeleton className="h-10 w-24 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 mt-8" data-testid="list-internships">
                {internships?.map((internship) => (
                  <JobCard key={internship.id} internship={internship} />
                ))}
              </div>
              
              {internships?.length === 0 && (
                <div className="text-center py-12" data-testid="text-no-results">
                  <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No internships found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or removing some filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({ query: "", location: "", industry: "" })}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              {internships && internships.length > 0 && (
                <div className="flex justify-center mt-8" data-testid="pagination">
                  <div className="flex space-x-2">
                    <Button variant="outline" disabled data-testid="button-previous">
                      Previous
                    </Button>
                    <Button className="bg-primary text-primary-foreground" data-testid="button-page-1">
                      1
                    </Button>
                    <Button variant="outline" data-testid="button-page-2">
                      2
                    </Button>
                    <Button variant="outline" data-testid="button-page-3">
                      3
                    </Button>
                    <Button variant="outline" data-testid="button-next">
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

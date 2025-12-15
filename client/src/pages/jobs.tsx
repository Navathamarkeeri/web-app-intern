import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import JobFilters from "@/components/jobs/job-filters";
import JobCard from "@/components/jobs/job-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Internship } from "@shared/schema";

// Fallback mock data for when API is unavailable (e.g., Netlify static hosting)
const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "Microsoft",
    description: "Join our team to develop scalable web applications using React, Node.js, and Azure cloud services. You'll work on real products used by millions of users worldwide.",
    location: "Seattle, WA",
    duration: "3 months",
    salary: "$6,000/month",
    requirements: ["Computer Science or related field", "Experience with JavaScript", "Knowledge of React", "Understanding of software development principles"],
    skills: ["React", "Node.js", "Azure", "TypeScript", "JavaScript", "Git"],
    industry: "Technology",
    isRemote: false,
    companyLogo: "fab fa-microsoft",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "Google",
    description: "Work with large datasets to derive insights and build machine learning models. Experience with Python, SQL, and TensorFlow preferred.",
    location: "Mountain View, CA",
    duration: "3 months",
    salary: "$7,500/month",
    requirements: ["Statistics or Computer Science background", "Python proficiency", "SQL knowledge", "Machine learning fundamentals"],
    skills: ["Python", "SQL", "TensorFlow", "Machine Learning", "Data Analysis", "Statistics"],
    industry: "Technology",
    isRemote: false,
    companyLogo: "fab fa-google",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: "3",
    title: "UX Design Intern",
    company: "Spotify",
    description: "Design user experiences for our mobile and web platforms. Collaborate with product managers and engineers to create intuitive interfaces.",
    location: "New York, NY",
    duration: "4 months",
    salary: "$5,500/month",
    requirements: ["Design portfolio", "Figma proficiency", "User research experience", "Basic prototyping skills"],
    skills: ["Figma", "Sketch", "Prototyping", "User Research", "Design Systems", "Adobe Creative Suite"],
    industry: "Technology",
    isRemote: false,
    companyLogo: "fab fa-spotify",
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: "4",
    title: "Product Management Intern",
    company: "Slack",
    description: "Work with cross-functional teams to define product roadmaps and drive feature development. Great opportunity to learn product strategy.",
    location: "San Francisco, CA",
    duration: "3 months",
    salary: "$6,500/month",
    requirements: ["Business or technical background", "Analytical thinking", "Communication skills", "Interest in product development"],
    skills: ["Product Strategy", "Analytics", "Roadmapping", "User Stories", "Market Research", "Agile"],
    industry: "Technology",
    isRemote: true,
    companyLogo: "fab fa-slack",
    postedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: "5",
    title: "Marketing Analytics Intern",
    company: "Netflix",
    description: "Analyze marketing campaigns and user engagement data to optimize marketing strategies and improve user acquisition.",
    location: "Los Angeles, CA",
    duration: "4 months",
    salary: "$5,000/month",
    requirements: ["Marketing or Analytics background", "Excel proficiency", "SQL knowledge", "Statistical analysis skills"],
    skills: ["Excel", "SQL", "Google Analytics", "A/B Testing", "Data Visualization", "Marketing"],
    industry: "Media",
    isRemote: false,
    companyLogo: "fab fa-netflix",
    postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: "6",
    title: "Financial Analyst Intern",
    company: "Goldman Sachs",
    description: "Support investment banking teams with financial modeling, market research, and client presentations. Great exposure to finance industry.",
    location: "New York, NY",
    duration: "10 weeks",
    salary: "$8,000/month",
    requirements: ["Finance or Economics major", "Excel expertise", "Financial modeling knowledge", "Strong analytical skills"],
    skills: ["Excel", "Financial Modeling", "PowerPoint", "Bloomberg", "VBA", "SQL"],
    industry: "Finance",
    isRemote: false,
    companyLogo: "fas fa-building",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
];

export default function Jobs() {
  const [filters, setFilters] = useState({
    query: "",
    location: "",
    industry: "",
  });

  const { data: internships, isLoading, error } = useQuery({
    queryKey: ['/api/internships', filters.query, filters.location, filters.industry],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        if (filters.query) params.append('q', filters.query);
        if (filters.location && filters.location !== 'All Locations') params.append('location', filters.location);
        if (filters.industry && filters.industry !== 'All Industries') params.append('industry', filters.industry);
        
        const response = await fetch(`/api/internships?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch internships');
        return response.json() as Promise<Internship[]>;
      } catch (err) {
        // Fallback to mock data if API is unavailable (e.g., Netlify static hosting)
        console.warn('API unavailable, using mock data:', err);
        let filtered = MOCK_INTERNSHIPS;
        
        // Apply client-side filtering for mock data
        if (filters.query) {
          const queryLower = filters.query.toLowerCase();
          filtered = filtered.filter(internship => 
            internship.title.toLowerCase().includes(queryLower) ||
            internship.company.toLowerCase().includes(queryLower) ||
            internship.description.toLowerCase().includes(queryLower)
          );
        }
        if (filters.location && filters.location !== 'All Locations') {
          filtered = filtered.filter(internship => 
            internship.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }
        if (filters.industry && filters.industry !== 'All Industries') {
          filtered = filtered.filter(internship => 
            internship.industry.toLowerCase() === filters.industry.toLowerCase()
          );
        }
        
        return filtered;
      }
    },
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

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

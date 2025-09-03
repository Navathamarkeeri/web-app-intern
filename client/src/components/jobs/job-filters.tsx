import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobFiltersProps {
  onFilterChange: (filters: { query: string; location: string; industry: string }) => void;
  filters: { query: string; location: string; industry: string };
}

export default function JobFilters({ onFilterChange, filters }: JobFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [activeSkills, setActiveSkills] = useState<string[]>(['React', 'Python', 'Data Science']);

  const locations = [
    'All Locations',
    'Remote',
    'New York, NY',
    'San Francisco, CA',
    'Seattle, WA',
    'Boston, MA',
    'Austin, TX',
    'Chicago, IL',
  ];

  const industries = [
    'All Industries',
    'Technology',
    'Finance',
    'Healthcare',
    'Marketing',
    'Consulting',
    'Media',
    'Education',
  ];

  const commonSkills = [
    'React', 'Python', 'Java', 'JavaScript', 'Node.js', 'SQL', 'AWS',
    'Machine Learning', 'Data Science', 'Figma', 'Marketing', 'Analytics'
  ];

  const handleInputChange = (field: string, value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSkill = (skill: string) => {
    setActiveSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    const clearedFilters = { query: "", location: "", industry: "" };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setActiveSkills([]);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6" data-testid="container-job-filters">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
            <Input
              placeholder="Search internships..."
              className="pl-10"
              value={localFilters.query}
              onChange={(e) => handleInputChange('query', e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>
        
        <div>
          <Select 
            value={localFilters.location} 
            onValueChange={(value) => handleInputChange('location', value)}
          >
            <SelectTrigger data-testid="select-location">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location} data-testid={`option-location-${location.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={localFilters.industry} 
            onValueChange={(value) => handleInputChange('industry', value)}
          >
            <SelectTrigger data-testid="select-industry">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry} data-testid={`option-industry-${industry.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {commonSkills.map((skill) => (
          <Button
            key={skill}
            variant={activeSkills.includes(skill) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSkill(skill)}
            className="text-sm"
            data-testid={`button-skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            {skill}
          </Button>
        ))}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-sm text-muted-foreground"
          data-testid="button-clear-filters"
        >
          <i className="fas fa-times mr-1"></i>
          Clear All
        </Button>
      </div>
    </div>
  );
}

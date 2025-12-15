import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UniversityDashboard() {
  return (
    <div className="py-16 bg-background" data-testid="page-dashboard-university">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">University Portal (Demo)</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Placement Rate</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">72% this semester</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Employers</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">TechCorp, DataWorks, FinEdge</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Skill Gaps</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Cloud, Data Engineering, DevOps</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}




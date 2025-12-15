import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmployerDashboard() {
  return (
    <div className="py-16 bg-background" data-testid="page-dashboard-employer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Employer Dashboard (Demo)</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Open Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Software Engineering Intern</span>
                <Button variant="outline" size="sm">View Matches</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Science Intern</span>
                <Button variant="outline" size="sm">View Matches</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shortlist</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Ranked candidates will appear here.</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



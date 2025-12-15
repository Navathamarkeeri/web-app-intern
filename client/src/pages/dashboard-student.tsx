import ApplicationStats from "@/components/applications/application-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentDashboard() {
  return (
    <div className="py-16 bg-background" data-testid="page-dashboard-student">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard (Demo)</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Application Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationStats />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resume Score</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Upload in Home to see ATS score and suggestions.</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



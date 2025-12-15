import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {
  return (
    <div className="py-16 bg-background" data-testid="page-features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>For Students</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              AI resume analysis, internship matching, and application tracking.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Employers</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Post roles, view ranked matches, shortlist, and manage pipelines.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Universities</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Placement analytics, cohort insights, and employer partnerships.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



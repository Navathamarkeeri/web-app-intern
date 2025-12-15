import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Roadmap() {
  return (
    <div className="py-16 bg-background" data-testid="page-roadmap">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Product Roadmap</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Now</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">AI resume demo, job search, application tracking.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Next</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Employer dashboard, shortlist, messaging.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Later</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">University analytics, referrals, API integrations.</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



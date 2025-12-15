import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="py-16 bg-background" data-testid="page-pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Basic resume analysis and limited matches.</p>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Student Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Advanced insights, unlimited matches, ATS tips.</p>
              <Button className="w-full">Upgrade</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Employer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Job posts, candidate matching, shortlists.</p>
              <Button className="w-full">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



import { Button } from "@/components/ui/button";

export default function Referral() {
  const code = "JOIN-INTERNS-2025";
  return (
    <div className="py-16 bg-background" data-testid="page-referral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Referral & Ambassador Program</h1>
        <p className="text-muted-foreground mb-6">
          Invite friends and classmates. Earn perks when they sign up and upload resumes.
        </p>
        <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
          <span className="font-mono">{code}</span>
          <Button onClick={() => navigator.clipboard.writeText(code)}>Copy Code</Button>
        </div>
      </div>
    </div>
  );
}




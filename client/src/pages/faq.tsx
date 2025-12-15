export default function FAQ() {
  return (
    <div className="py-16 bg-background" data-testid="page-faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">FAQ</h1>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground">How does matching work?</h3>
            <p>We analyze resume content and map it to job skill requirements.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Is there a free plan?</h3>
            <p>Yes. You can upgrade for deeper insights and unlimited matches.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Can employers shortlist?</h3>
            <p>Yes, on the employer dashboard with ranked candidates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



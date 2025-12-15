export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12" data-testid="footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-robot text-primary text-2xl"></i>
              <h5 className="text-xl font-bold text-foreground">AI InternMatch</h5>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Empowering students to find perfect internship matches through AI-powered resume analysis and job matching.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-linkedin">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-github">
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h6 className="font-semibold text-foreground mb-4">Platform</h6>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/jobs" className="hover:text-primary" data-testid="link-browse-internships">Browse Internships</a></li>
              <li><a href="/features" className="hover:text-primary" data-testid="link-resume-analysis">Features</a></li>
              <li><a href="/applications" className="hover:text-primary" data-testid="link-application-tracking">Application Tracking</a></li>
              <li><a href="/pricing" className="hover:text-primary" data-testid="link-career-resources">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold text-foreground mb-4">Support</h6>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/faq" className="hover:text-primary" data-testid="link-help-center">Help Center</a></li>
              <li><a href="/contact" className="hover:text-primary" data-testid="link-contact">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary" data-testid="link-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary" data-testid="link-terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">© 2024 AI InternMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

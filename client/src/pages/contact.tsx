import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <div className="py-16 bg-background" data-testid="page-contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={5} placeholder="How can we help?" />
          </div>
          <Button className="w-full">Send</Button>
        </div>
      </div>
    </div>
  );
}



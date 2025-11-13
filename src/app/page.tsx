import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Building2, ArrowRight, BarChart, PenSquare, Share2, Search, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <PenSquare />,
    title: "AI-Powered CV Builder",
    description: "Craft a professional CV in minutes with our intuitive, 5-step guided form and AI content suggestions.",
  },
  {
    icon: <BarChart />,
    title: "ATS Compatibility Scoring",
    description: "Analyze your CV's compatibility with Applicant Tracking Systems to increase your chances of getting noticed.",
  },
  {
    icon: <Share2 />,
    title: "Shareable Public Profile",
    description: "Create a shareable link to your professional profile and track who views it.",
  }
];

const recruiterFeatures = [
    {
        icon: <Search />,
        title: "Advanced Candidate Search",
        description: "Find the perfect talent with powerful filters for skills, experience, location, and more.",
    },
    {
        icon: <Users />,
        title: "Access to a Diverse Talent Pool",
        description: "Tap into a growing database of qualified professionals in Angola looking for their next opportunity.",
    },
    {
        icon: <MessageSquare />,
        title: "Direct Candidate Messaging",
        description: "Connect with promising candidates directly through our integrated and simple chat feature.",
    }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
            <Building2 className="h-7 w-7" />
            <span>Loneus</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
          </nav>
          <div className="flex items-center gap-2">
             <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
             </Button>
            <Button asChild>
              <Link href="/login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center md:px-6">
            <Badge variant="outline" className="mb-4">Now in Open Beta</Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
              The Modern CV Platform for Angola
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Build a world-class CV, optimize it for recruiters with AI, and get discovered. Loneus helps you stand out in the Angolan job market.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">Create Your CV Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                 <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Everything You Need to Succeed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From creation to application, Loneus provides the tools to accelerate your career.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="for-recruiters" className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <Badge variant="secondary" className="mb-4">For Recruiters</Badge>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                        Find Your Next Great Hire
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Access a curated talent pool and streamline your hiring process with our powerful recruitment tools.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {recruiterFeatures.map((feature, index) => (
                        <Card key={index} className="bg-secondary/50">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                                    {feature.icon}
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <div className="mt-12 text-center">
                    <Button size="lg" asChild>
                        <Link href="/login">Request a Demo</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="pricing" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
               <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start for free and upgrade when you need more power.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-md gap-8 lg:max-w-4xl lg:grid-cols-2">
               <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For individuals getting started.</CardDescription>
                  <p className="font-headline text-4xl font-bold">AOA 0 <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                   <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="text-primary"/>1 CV and Cover Letter</li>
                    <li className="flex items-center gap-2"><Check className="text-primary"/>Standard Templates</li>
                    <li className="flex items-center gap-2"><Check className="text-primary"/>Shareable Profile Link</li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full" asChild>
                    <Link href="/login">Get Started for Free</Link>
                  </Button>
                </div>
              </Card>
              <Card className="border-primary flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                     <CardTitle>Pro</CardTitle>
                     <Badge>Most Popular</Badge>
                  </div>
                  <CardDescription>For professionals serious about their career.</CardDescription>
                  <p className="font-headline text-4xl font-bold">AOA 5,000 <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                   <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="text-primary"/>Unlimited CVs and Letters</li>
                    <li className="flex items-center gap-2"><Check className="text-primary"/>Premium Templates & Designs</li>
                    <li className="flex items-center gap-2"><Check className="text-primary"/>AI Content Assistance</li>
                    <li className="flex items-center gap-2"><Check className="text-primary"/>Advanced ATS Scoring</li>
                    <li className="flex items-center gap-2"><Check className="text-primary"/>Profile View Analytics</li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full" asChild>
                    <Link href="/login">Go Pro</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Loneus. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

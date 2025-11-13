"use client";

import { useUserProfile } from "@/hooks/use-user-profile";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowUpRight, Edit, Eye, Share2, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function PersonalDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-1 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Europass Preview</CardTitle>
            <CardDescription>A snapshot of your current professional profile.</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/cv-editor">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <header className="flex flex-col items-start gap-6 sm:flex-row">
                <Image
                    src="https://picsum.photos/seed/user-avatar/120/120"
                    alt="User profile picture"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-background shadow-md"
                    data-ai-hint="person face"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold font-headline text-primary">John Doe</h1>
                    <p className="text-lg text-foreground">Software Engineer</p>
                    <p className="mt-1 text-sm text-muted-foreground">Luanda, Angola</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Badge>React</Badge>
                        <Badge>Node.js</Badge>
                        <Badge>PostgreSQL</Badge>
                        <Badge>DevOps</Badge>
                    </div>
                </div>
            </header>
            <Separator className="my-6" />
            <section>
                <h2 className="text-xl font-semibold">Professional Summary</h2>
                <p className="mt-2 text-muted-foreground">
                A highly motivated Software Engineer with 5+ years of experience in developing and deploying scalable web applications. Proficient in modern JavaScript frameworks and cloud technologies. Passionate about building solutions for the Angolan market.
                </p>
            </section>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-1 lg:col-span-3 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ATS Compatibility</CardTitle>
            <Star className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">88%</div>
            <p className="text-xs text-muted-foreground">Excellent score for most systems</p>
          </CardContent>
          <CardFooter>
            <Button asChild size="sm" variant="secondary" className="w-full">
              <Link href="/dashboard/ats-checker">
                Re-check my CV <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function RecruiterDashboard() {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center h-full">
             <PlaceholderPage 
                title="Welcome, Recruiter!"
                description="This is your dashboard. Start by searching for candidates or setting up your company profile."
             />
             <div className="mt-6 flex gap-4">
                <Button asChild>
                    <Link href="/dashboard/candidate-search">Search Candidates</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/dashboard/company-profile">Company Profile</Link>
                </Button>
             </div>
        </div>
    )
}


export default function DashboardPage() {
    const { profile, isLoading } = useUserProfile();

    if (isLoading) {
       return (
         <div className="flex h-[50vh] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
       );
    }

    if (profile?.role === 'recruiter') {
        return <RecruiterDashboard />;
    }

    return <PersonalDashboard />;
}

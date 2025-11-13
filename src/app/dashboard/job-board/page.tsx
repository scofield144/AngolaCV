"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import jobListings from "./jobs.json";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  tags: string[];
  postedDate: string;
}

export default function JobBoardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Job Board</h1>
        <p className="text-muted-foreground">
          Find the latest job opportunities in Angola.
        </p>
      </div>

      <div className="grid gap-6">
        {(jobListings as Job[]).map((job) => (
          <Card key={job.id}>
            <CardHeader className="grid items-start gap-4 space-y-0 sm:grid-cols-3 sm:gap-6">
              <div className="space-y-1 sm:col-span-2">
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription className="text-sm">
                  {job.company} &middot; {job.location}
                </CardDescription>
              </div>
              <div className="flex items-center justify-start space-x-2 sm:justify-end">
                <Badge variant="secondary">{job.type}</Badge>
                <Button asChild variant="secondary" size="sm">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Apply <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Posted on: {job.postedDate}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

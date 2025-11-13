
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cva } from "class-variance-authority";

type ApplicationStatus = "Applied" | "Under Review" | "Interviewing" | "Offered" | "Rejected";

const applications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Engineer",
    company: "Tech Innovate Angola",
    dateApplied: "2024-07-21",
    status: "Under Review" as ApplicationStatus,
  },
  {
    id: 2,
    jobTitle: "Data Analyst",
    company: "Angola Analytics Group",
    dateApplied: "2024-07-20",
    status: "Interviewing" as ApplicationStatus,
  },
  {
    id: 3,
    jobTitle: "Project Manager",
    company: "BuildRight Construtora",
    dateApplied: "2024-07-19",
    status: "Rejected" as ApplicationStatus,
  },
  {
    id: 4,
    jobTitle: "Marketing Digital Specialist",
    company: "Mercado Nacional Online",
    dateApplied: "2024-07-18",
    status: "Applied" as ApplicationStatus,
  },
];

const statusBadgeVariants = cva(
  "capitalize",
  {
    variants: {
      status: {
        Applied: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
        "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
        Interviewing: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
        Offered: "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200 dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-800",
        Rejected: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
      },
    },
    defaultVariants: {
      status: "Applied",
    },
  }
)

export default function MyApplicationsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold font-headline">My Applications</h1>
        <p className="text-muted-foreground">
          Track the status of all your job applications in one place.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
          <CardDescription>
            You have applied to {applications.length} jobs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead className="hidden sm:table-cell">Applied On</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="font-medium">{app.jobTitle}</div>
                    <div className="text-sm text-muted-foreground">{app.company}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(app.dateApplied).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'})}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={statusBadgeVariants({ status: app.status })}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="#">View <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {applications.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center min-h-[200px]">
                <h3 className="text-lg font-semibold text-foreground">No Applications Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Start applying to jobs to see your history here.</p>
                <Button asChild>
                    <Link href="/dashboard/job-board">Browse Jobs</Link>
                </Button>
            </div>
        )}
        </CardContent>
      </Card>
    </div>
  );
}

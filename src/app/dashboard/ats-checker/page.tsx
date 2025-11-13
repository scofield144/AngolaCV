"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getAtsScore } from "./actions";
import { type AtsCompatibilityOutput } from "@/ai/flows/ats-compatibility-scoring";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function AtsCheckerPage() {
  const [cvText, setCvText] = useState("");
  const [result, setResult] = useState<AtsCompatibilityOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvText.trim()) {
      toast({
        variant: "destructive",
        title: "CV content is empty",
        description: "Please paste your CV content before analyzing.",
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const scoreResult = await getAtsScore(cvText);
      setResult(scoreResult);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>ATS Compatibility Checker</CardTitle>
          <CardDescription>
            Paste your CV content below to analyze its compatibility with Applicant Tracking Systems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Paste your CV content here..."
              className="min-h-[400px] resize-y"
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Analyzing..." : "Analyze CV"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Analysis Result</CardTitle>
          <CardDescription>
            Your score and feedback will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compatibility Score</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-3xl font-bold text-primary">{result.score}%</span>
                  <Progress value={result.score} className="flex-1 h-3" />
                </div>
              </div>
              
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Feedback & Improvements</AlertTitle>
                <AlertDescription>
                  <div className="max-w-none text-muted-foreground whitespace-pre-wrap text-sm">
                    {result.feedback}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
          {!isLoading && !result && (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <p>Your results will be shown here after analysis.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

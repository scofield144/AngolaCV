"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Copy, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getAiSuggestion } from "../actions";
import { toast } from "@/hooks/use-toast";

interface AiSuggestionDialogProps {
  currentJobTitle: string;
  onSuggestionSelect: (suggestion: string) => void;
}

export function AiSuggestionDialog({ currentJobTitle, onSuggestionSelect }: AiSuggestionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!currentJobTitle) {
      toast({
        variant: "destructive",
        title: "Job Title Missing",
        description: "Please enter your job title before generating suggestions.",
      });
      return;
    }
    setIsLoading(true);
    setSuggestion("");
    try {
      const result = await getAiSuggestion(currentJobTitle);
      setSuggestion(result.suggestedContent);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Failed to generate suggestion",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSuggestion = () => {
    onSuggestionSelect(suggestion);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          AI Assist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Content Assistant</DialogTitle>
          <DialogDescription>
            Generate suggestions based on your job title and Angolan job market trends.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
            <Button onClick={handleGenerate} disabled={isLoading || !currentJobTitle} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Generating..." : `Generate for "${currentJobTitle}"`}
            </Button>
          
            {suggestion && (
                <Textarea value={suggestion} readOnly className="min-h-[200px] bg-secondary" />
            )}

            {!suggestion && !isLoading && (
                <div className="flex items-center justify-center h-[200px] rounded-md border border-dashed text-center text-muted-foreground">
                    <p>Your AI-generated content will appear here.</p>
                </div>
            )}
             {isLoading && (
                <div className="flex items-center justify-center h-[200px] rounded-md border text-center text-muted-foreground bg-secondary">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}

        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleUseSuggestion} disabled={!suggestion}>
            <Copy className="mr-2 h-4 w-4" /> Use This Suggestion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

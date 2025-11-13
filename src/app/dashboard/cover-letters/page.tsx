'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Save, FileText } from 'lucide-react';
import { useUserProfile } from '@/hooks/use-user-profile';
import { getAiCoverLetter, saveCoverLetter } from './actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase';

export default function CoverLetterBuilderPage() {
  const { user } = useUser();
  const { profile, isLoading: isLoadingProfile } = useUserProfile();
  const { toast } = useToast();

  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [recipientName, setRecipientName] =useState('');
  const [coverLetterContent, setCoverLetterContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleGenerate = async () => {
    if (!profile || !jobTitle || !companyName) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill in your profile, the job title, and company name first."
        });
        return;
    }

    setIsGenerating(true);
    try {
        const result = await getAiCoverLetter({
            jobTitle,
            companyName,
            recipientName,
            userProfile: {
                fullName: profile.fullName,
                summary: profile.summary,
                skills: profile.skills,
            }
        });
        setCoverLetterContent(result.coverLetterContent);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({
            variant: "destructive",
            title: "Generation Failed",
            description: errorMessage,
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!user || !coverLetterContent) {
        toast({
            variant: "destructive",
            title: "Nothing to Save",
            description: "Please generate a cover letter before saving."
        });
        return;
    }
    setIsSaving(true);
    try {
        const title = `Cover Letter for ${jobTitle} at ${companyName}`;
        await saveCoverLetter(user.uid, title, coverLetterContent);
        toast({
            title: "Cover Letter Saved!",
            description: "It has been added to your library.",
        });
    } catch (error) {
         const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({
            variant: "destructive",
            title: "Save Failed",
            description: errorMessage,
        });
    } finally {
        setIsSaving(false);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Cover Letter Builder</h1>
        <p className="text-muted-foreground">
          Create a tailored cover letter for your next job application with AI assistance.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column for inputs */}
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>
                        Provide the details of the job you're applying for.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g., Senior Developer" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g., Tech Innovate Angola" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="recipientName">Hiring Manager Name (Optional)</Label>
                        <Input id="recipientName" value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="e.g., João Silva" />
                    </div>
                </CardContent>
            </Card>
            <Button onClick={handleGenerate} disabled={isGenerating || !jobTitle || !companyName || isLoadingProfile} className="w-full">
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isGenerating ? 'Generating...' : 'AI Generate Content'}
            </Button>
        </div>

        {/* Right column for the editor */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Your Cover Letter</CardTitle>
                            <CardDescription>Edit and refine the generated content below.</CardDescription>
                        </div>
                        <Button onClick={handleSave} disabled={isSaving || !coverLetterContent}>
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {isGenerating || isLoadingProfile ? (
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-3/4" />
                            <br/>
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-full" />
                        </div>
                    ) : (
                        <Textarea
                            placeholder="Your generated cover letter will appear here. Start by filling in the job details and clicking 'AI Generate Content'."
                            value={coverLetterContent}
                            onChange={e => setCoverLetterContent(e.target.value)}
                            className="min-h-[500px] resize-y"
                        />
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

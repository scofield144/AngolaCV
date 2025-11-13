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
import { Loader2, Save } from 'lucide-react';
import { saveCoverLetter } from './actions';
import { useUser } from '@/firebase';

export default function CoverLetterBuilderPage() {
  const { user } = useUser();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [coverLetterContent, setCoverLetterContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user || !coverLetterContent || !title) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a title and content for your cover letter before saving.',
      });
      return;
    }
    setIsSaving(true);
    try {
      await saveCoverLetter(user.uid, title, coverLetterContent);
      toast({
        title: 'Cover Letter Saved!',
        description: 'It has been added to your library.',
      });
      setTitle('');
      setCoverLetterContent('');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Save Failed',
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
          Create and save a cover letter for your job applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Cover Letter</CardTitle>
              <CardDescription>
                Write your cover letter below and save it to your library.
              </CardDescription>
            </div>
            <Button onClick={handleSave} disabled={isSaving || !coverLetterContent || !title}>
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
              <Label htmlFor="title">Cover Letter Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., Cover Letter for Senior Developer at Tech Innovate"
              />
           </div>
          <Textarea
            placeholder="Dear Hiring Manager..."
            value={coverLetterContent}
            onChange={(e) => setCoverLetterContent(e.target.value)}
            className="min-h-[500px] resize-y"
          />
        </CardContent>
      </Card>
    </div>
  );
}

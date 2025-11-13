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
import { toast } from '@/hooks/use-toast';
import { Upload, Building, Link as LinkIcon, Linkedin, Globe } from 'lucide-react';
import Image from 'next/image';

export default function CompanyProfilePage() {
  // Using local state for simplicity, can be migrated to react-hook-form later.
  const [profile, setProfile] = useState({
    companyName: 'Tech Innovate Angola',
    website: 'https://techinnovate.ao',
    industry: 'Technology',
    location: 'Luanda, Angola',
    about: 'Tech Innovate Angola is a leading provider of cutting-edge technology solutions, driving digital transformation across various sectors in Angola. We are committed to fostering local talent and building a brighter future through innovation.',
    linkedin: 'https://linkedin.com/company/tech-innovate-ao',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    // In a real app, you would save this data to your backend (e.g., Firestore).
    console.log('Saving profile:', profile);
    toast({
      title: 'Profile Updated',
      description: 'Your company profile has been saved successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Company Profile</h1>
        <p className="text-muted-foreground">
          Manage your company's information and branding to attract top talent.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://picsum.photos/seed/companylogo/100/100"
                alt="Company Logo"
                width={80}
                height={80}
                className="rounded-lg border bg-muted"
                data-ai-hint="company logo"
              />
              <div>
                <h2 className="text-xl font-semibold">{profile.companyName}</h2>
                <p className="text-sm text-muted-foreground">Update your company logo and details.</p>
              </div>
            </div>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Logo
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <Card>
            <CardHeader>
              <CardTitle>Core Details</CardTitle>
              <CardDescription>
                Basic information about your company.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" value={profile.companyName} onChange={handleInputChange} placeholder="Your company's name" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" value={profile.website} onChange={handleInputChange} placeholder="https://example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" name="industry" value={profile.industry} onChange={handleInputChange} placeholder="e.g., Oil & Gas, Technology" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={profile.location} onChange={handleInputChange} placeholder="e.g., Luanda, Angola" />
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>About Your Company</CardTitle>
              <CardDescription>
                Provide a detailed description of your company mission, culture, and values.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Textarea 
                name="about"
                value={profile.about}
                onChange={handleInputChange}
                placeholder="Describe what makes your company a great place to work..."
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Link to your company's online presence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                 <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="linkedin" name="linkedin" value={profile.linkedin} onChange={handleInputChange} className="pl-10" placeholder="linkedin.com/company/..."/>
                </div>
              </div>
               {/* Add more social links here if needed */}
            </CardContent>
          </Card>
        </div>
      </div>
      
       <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>

    </div>
  );
}

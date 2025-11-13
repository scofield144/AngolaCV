
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { doc } from 'firebase/firestore';

import { useUser, useFirestore, setDocumentNonBlocking } from "@/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Save, ArrowRight, ArrowLeft, PlusCircle, Trash2 } from "lucide-react";
import { AiSuggestionDialog } from "./_components/ai-suggestion-dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const experienceSchema = z.object({
  jobTitle: z.string().min(2, "Job title is required."),
  company: z.string().min(2, "Company is required."),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const educationSchema = z.object({
    degree: z.string().min(2, "Degree or certificate is required."),
    institution: z.string().min(2, "Institution is required."),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

const profileFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters."),
  location: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  linkedin: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  github: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  portfolio: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  summary: z.string().max(1000, "Summary cannot exceed 1000 characters.").optional(),
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  languages: z.string().optional(),
  skills: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  fullName: "John Doe",
  jobTitle: "Software Engineer",
  location: "Luanda, Angola",
  email: "john.doe@example.com",
  phone: '',
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  portfolio: '',
  summary: "A highly motivated Software Engineer with 5+ years of experience in developing and deploying scalable web applications. Proficient in modern JavaScript frameworks and cloud technologies. Passionate about building solutions for the Angolan market.",
  skills: "React, Node.js, PostgreSQL, DevOps, TypeScript, English, Portuguese",
  languages: "- Portuguese (Native)\n- English (Fluent)",
  experiences: [
    { jobTitle: "Senior Developer", company: "Tech Solutions LDA", location: "Luanda", startDate: "2020-01-01", endDate: "Present", description: "- Led the development of a new e-commerce platform, resulting in a 30% increase in sales.\n- Mentored junior developers and conducted code reviews."}
  ],
  educations: [
      { degree: "Bachelor of Science in Computer Science", institution: "Universidade Agostinho Neto", startDate: "2015-09-01", endDate: "2019-07-01" }
  ],
};

const steps = [
  { id: 1, title: 'Personal Data', fields: ['fullName', 'jobTitle', 'email', 'phone', 'location', 'linkedin', 'github', 'portfolio'] },
  { id: 2, title: 'Professional Experience', fields: ['summary', 'experiences'] },
  { id: 3, title: 'Education and Training', fields: ['educations'] },
  { id: 4, title: 'Skills', fields: ['skills'] },
  { id: 5, title: 'Language Skills', fields: ['languages'] },
];

export default function MyProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
      control: form.control,
      name: "educations",
  });


  const { trigger, getValues } = form;

  async function handleNext() {
    const fields = steps[currentStep - 1].fields;
    const output = await trigger(fields as any, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePrev() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function onSubmit(data: ProfileFormValues) {
    if (!user || !firestore) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to save your profile."
        });
        return;
    }

    const userProfileRef = doc(firestore, 'users', user.uid);
    
    const [firstName, ...lastNameParts] = data.fullName.split(' ');
    const lastName = lastNameParts.join(' ');
    
    const profileData = {
        ...data,
        firstName,
        lastName,
        lastUpdated: new Date()
    };

    setDocumentNonBlocking(userProfileRef, profileData, { merge: true });

    toast({
      title: "Profile Saved!",
      description: "Your CV information has been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-headline">My Profile</h1>
          {currentStep === steps.length && (
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          )}
        </div>

        <div className="space-y-2">
            <Progress value={(currentStep / steps.length) * 100} />
            <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}: {steps[currentStep-1].title}</p>
        </div>


        {currentStep === 1 && (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Data</CardTitle>
                        <CardDescription>This information will appear at the top of your CV.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <FormField name="fullName" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., João Silva" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="jobTitle" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Job Title / Headline</FormLabel><FormControl><Input placeholder="e.g., Senior Software Engineer" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="email" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="phone" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+244..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="location" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., Luanda, Angola" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Social & Links</CardTitle>
                        <CardDescription>Showcase your online presence and portfolio.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <FormField name="linkedin" control={form.control} render={({ field }) => ( <FormItem><FormLabel>LinkedIn Profile</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="github" control={form.control} render={({ field }) => ( <FormItem><FormLabel>GitHub Profile</FormLabel><FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="portfolio" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Portfolio/Website</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                    </CardContent>
                </Card>
            </>
        )}
        
        {currentStep === 2 && (
            <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                      <CardTitle>Professional Experience</CardTitle>
                      <CardDescription>Your professional summary and work history.</CardDescription>
                  </div>
                  <AiSuggestionDialog
                    currentJobTitle={form.watch('jobTitle')}
                    onSuggestionSelect={(suggestion) => {
                      const currentExperience = getValues('experiences');
                      if (currentExperience.length > 0) {
                        form.setValue(`experiences.${currentExperience.length - 1}.description`, suggestion, { shouldValidate: true });
                      }
                      toast({ title: "Content updated with AI suggestion." });
                    }}
                  />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField name="summary" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Professional Summary</FormLabel><FormControl><Textarea placeholder="A brief summary of your professional background..." {...field} /></FormControl><FormMessage /></FormItem> )} />
              <Separator />
              <div className="space-y-4">
                {experienceFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}><Trash2 className="text-destructive" /></Button>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField name={`experiences.${index}.jobTitle`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField name={`experiences.${index}.company`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField name={`experiences.${index}.location`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem> )} />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <FormField name={`experiences.${index}.startDate`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem> )} />
                            <FormField name={`experiences.${index}.endDate`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="date" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem> )} />
                        </div>
                        <FormField name={`experiences.${index}.description`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="min-h-32" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem> )} />
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendExperience({ jobTitle: '', company: '', description: '' })}><PlusCircle className="mr-2"/> Add Experience</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
            <Card>
                <CardHeader><CardTitle>Education and Training</CardTitle><CardDescription>List your degrees, certifications, and relevant training.</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                    {educationFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}><Trash2 className="text-destructive" /></Button>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField name={`educations.${index}.degree`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>Degree / Certificate</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                                <FormField name={`educations.${index}.institution`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField name={`educations.${index}.startDate`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem> )} />
                                <FormField name={`educations.${index}.endDate`} control={form.control} render={({ field }) => ( <FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="date" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem> )} />
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendEducation({ degree: '', institution: '' })}><PlusCircle className="mr-2"/> Add Education</Button>
                </CardContent>
            </Card>
        )}

        {currentStep === 4 && (
            <Card>
                <CardHeader><CardTitle>Skills</CardTitle><CardDescription>List your technical and soft skills.</CardDescription></CardHeader>
                <CardContent>
                    <FormField name="skills" control={form.control} render={({ field }) => ( <FormItem><FormControl><Textarea placeholder="List your professional skills, separated by commas or on new lines." className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </CardContent>
            </Card>
        )}

        {currentStep === 5 && (
            <Card>
                <CardHeader><CardTitle>Language Skills</CardTitle><CardDescription>List the languages you speak and your proficiency level.</CardDescription></CardHeader>
                <CardContent>
                    <FormField name="languages" control={form.control} render={({ field }) => ( <FormItem><FormControl><Textarea placeholder="e.g., Portuguese (Native), English (Fluent)" className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </CardContent>
            </Card>
        )}
        
        <div className="flex justify-between pt-4">
            <div>
            {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handlePrev}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
            )}
            </div>
            <div>
            {currentStep < steps.length && (
                <Button type="button" onClick={handleNext}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
             {currentStep === steps.length && (
                <Button type="submit">
                    <Save className="mr-2 h-4 w-4" /> Save Profile
                </Button>
            )}
            </div>
        </div>

      </form>
    </Form>
  );
}

    
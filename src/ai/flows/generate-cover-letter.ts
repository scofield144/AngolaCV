'use server';
/**
 * @fileOverview A flow for generating professional cover letters.
 *
 * - generateCoverLetter - A function that creates cover letter content.
 * - GenerateCoverLetterInput - The input type for the function.
 * - GenerateCoverLetterOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  jobTitle: z.string().describe('The title of the job the user is applying for.'),
  companyName: z.string().describe('The name of the company.'),
  recipientName: z.string().optional().describe('The name of the hiring manager or recipient.'),
  userProfile: z.object({
    fullName: z.string().describe("The user's full name."),
    summary: z.string().optional().describe("The user's professional summary from their CV."),
    skills: z.string().optional().describe("A summary of the user's skills."),
  }).describe("A summary of the user's professional profile."),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetterContent: z.string().describe('The generated content for the cover letter.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: { schema: GenerateCoverLetterInputSchema },
  output: { schema: GenerateCoverLetterOutputSchema },
  prompt: `You are an expert career coach specializing in writing compelling cover letters for the Angolan job market.

Your task is to generate a professional and concise cover letter based on the provided user and job information. The tone should be professional but authentic. The letter should highlight how the user's profile aligns with the job.

**User Information:**
- Full Name: {{{userProfile.fullName}}}
- Professional Summary: {{{userProfile.summary}}}
- Key Skills: {{{userProfile.skills}}}

**Job Information:**
- Job Title: {{{jobTitle}}}
- Company: {{{companyName}}}
{{#if recipientName}}- Hiring Manager: {{{recipientName}}}{{/if}}

**Instructions:**
1.  Start with a professional greeting. If a recipient name is provided, use it. Otherwise, use a general greeting like "Dear Hiring Manager".
2.  The first paragraph should state the position being applied for and where it was seen (you can assume it was seen on Loneus). It should grab the reader's attention.
3.  The body paragraphs (1-2) should connect the user's summary and skills to the job title and company. Briefly mention how their background is a good fit. Do not just list skills; frame them as solutions to the company's needs.
4.  The closing paragraph should reiterate interest in the role and include a strong call to action (e.g., expressing eagerness to discuss their qualifications in an interview).
5.  End with a professional closing, followed by the user's full name.

Generate the cover letter content now.`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

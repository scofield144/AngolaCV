'use server';
/**
 * @fileOverview An AI-assisted CV content generation flow.
 *
 * - generateCvContent - A function that suggests CV content based on Angolan job trends.
 * - GenerateCvContentInput - The input type for the generateCvContent function.
 * - GenerateCvContentOutput - The return type for the generateCvContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCvContentInputSchema = z.object({
  jobTitle: z.string().describe('The job title for the CV.'),
  userSkills: z.array(z.string()).optional().describe('The skills of the user.'),
  userExperience: z.string().optional().describe('The user experience.'),
  userEducation: z.string().optional().describe('The user education.'),
  userLanguages: z.array(z.string()).optional().describe('The languages the user speaks.'),
});
export type GenerateCvContentInput = z.infer<typeof GenerateCvContentInputSchema>;

const GenerateCvContentOutputSchema = z.object({
  suggestedContent: z.string().describe('The AI-suggested content for the CV.'),
});
export type GenerateCvContentOutput = z.infer<typeof GenerateCvContentOutputSchema>;

export async function generateCvContent(input: GenerateCvContentInput): Promise<GenerateCvContentOutput> {
  return generateCvContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCvContentPrompt',
  input: {schema: GenerateCvContentInputSchema},
  output: {schema: GenerateCvContentOutputSchema},
  prompt: `You are an AI assistant specialized in generating CV content tailored for the Angolan job market.

  Based on the user's job title, skills, experience, education, and language skills, suggest relevant content that aligns with current job trends in Angola.

  Job Title: {{{jobTitle}}}
  Skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}{{/each}}{{else}}N/A{{/if}}
  Experience: {{{userExperience}}}
  Education: {{{userEducation}}}
  Languages: {{#if userLanguages}}{{#each userLanguages}}- {{{this}}}{{/each}}{{else}}N/A{{/if}}

  Suggested Content:`,
});

const generateCvContentFlow = ai.defineFlow(
  {
    name: 'generateCvContentFlow',
    inputSchema: GenerateCvContentInputSchema,
    outputSchema: GenerateCvContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

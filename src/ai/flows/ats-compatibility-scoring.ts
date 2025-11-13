'use server';

/**
 * @fileOverview A flow for scoring a CV for Applicant Tracking System (ATS) compatibility.
 *
 * - atsCompatibilityScore - A function that handles the ATS compatibility scoring process.
 * - AtsCompatibilityInput - The input type for the atsCompatibilityScore function.
 * - AtsCompatibilityOutput - The return type for the atsCompatibilityScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AtsCompatibilityInputSchema = z.object({
  cvText: z
    .string()
    .describe('The text content of the CV to be scored for ATS compatibility.'),
});
export type AtsCompatibilityInput = z.infer<typeof AtsCompatibilityInputSchema>;

const AtsCompatibilityOutputSchema = z.object({
  score: z
    .number()
    .describe(
      'A score between 0 and 100 representing the ATS compatibility of the CV.'
    ),
  feedback: z
    .string()
    .describe(
      'Feedback on how to improve the CVs ATS compatibility, including specific areas for improvement.'
    ),
});
export type AtsCompatibilityOutput = z.infer<typeof AtsCompatibilityOutputSchema>;

export async function atsCompatibilityScore(input: AtsCompatibilityInput): Promise<AtsCompatibilityOutput> {
  return atsCompatibilityScoreFlow(input);
}

const atsCompatibilityPrompt = ai.definePrompt({
  name: 'atsCompatibilityPrompt',
  input: {schema: AtsCompatibilityInputSchema},
  output: {schema: AtsCompatibilityOutputSchema},
  prompt: `You are an expert in Applicant Tracking Systems (ATS) and resume parsing.

  Analyze the following CV text and provide an ATS compatibility score and feedback.

  CV Text: {{{cvText}}}

  Provide a score between 0 and 100, where 100 represents perfect ATS compatibility.
  Provide specific and actionable feedback on how to improve the CV's ATS compatibility, focusing on areas such as formatting, keywords, section headings, and the use of tables and images.
  Indicate any potential parsing issues that might arise with different ATS systems.
  Set the score output field to the calculated score, and set the feedback output field to a string containing all the feedback.`,
});

const atsCompatibilityScoreFlow = ai.defineFlow(
  {
    name: 'atsCompatibilityScoreFlow',
    inputSchema: AtsCompatibilityInputSchema,
    outputSchema: AtsCompatibilityOutputSchema,
  },
  async input => {
    const {output} = await atsCompatibilityPrompt(input);
    return output!;
  }
);

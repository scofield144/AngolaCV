"use server";

import { generateCvContent, type GenerateCvContentOutput } from "@/ai/flows/ai-assisted-cv-content";

export async function getAiSuggestion(jobTitle: string): Promise<GenerateCvContentOutput> {
  if (!jobTitle) {
    throw new Error("Job title is required to generate suggestions.");
  }
  
  try {
    // In a future implementation, more user data (skills, experience, etc.) can be passed here for richer suggestions.
    const result = await generateCvContent({ jobTitle });
    return result;
  } catch (error) {
    console.error("Error getting AI suggestion:", error);
    throw new Error("Failed to get AI suggestion. Please try again.");
  }
}

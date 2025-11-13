"use server";

import { atsCompatibilityScore, type AtsCompatibilityOutput } from "@/ai/flows/ats-compatibility-scoring";

export async function getAtsScore(cvText: string): Promise<AtsCompatibilityOutput> {
  if (!cvText) {
    throw new Error("CV text cannot be empty.");
  }
  
  try {
    const result = await atsCompatibilityScore({ cvText });
    return result;
  } catch (error) {
    console.error("Error getting ATS score:", error);
    throw new Error("Failed to get ATS compatibility score. Please try again.");
  }
}

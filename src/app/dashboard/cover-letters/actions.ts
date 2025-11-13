'use server';

import {
  generateCoverLetter,
  type GenerateCoverLetterInput,
  type GenerateCoverLetterOutput,
} from '@/ai/flows/generate-cover-letter';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getSdks } from '@/firebase';

export async function getAiCoverLetter(
  input: GenerateCoverLetterInput
): Promise<GenerateCoverLetterOutput> {
  if (!input.jobTitle || !input.companyName) {
    throw new Error('Job title and company name are required.');
  }

  try {
    const result = await generateCoverLetter(input);
    return result;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw new Error('Failed to get AI suggestion. Please try again.');
  }
}

export async function saveCoverLetter(
  userId: string,
  title: string,
  content: string
) {
  if (!userId || !title || !content) {
    throw new Error('Missing required fields to save the cover letter.');
  }

  try {
    // We cannot use the useFirestore() hook in server actions, so we initialize manually.
    const { firestore } = getSdks();
    const coverLettersRef = collection(firestore, 'users', userId, 'coverLetters');

    await addDoc(coverLettersRef, {
      title,
      content,
      creationDate: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving cover letter:', error);
    throw new Error('Failed to save cover letter. Please try again.');
  }
}

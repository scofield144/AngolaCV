
'use server';

import { collection, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

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
    const { firestore } = initializeFirebase();
    const coverLettersRef = collection(firestore, 'users', userId, 'coverLetters');

    // Use the non-blocking function. It returns a promise but we don't await it here.
    // Error handling is done inside addDocumentNonBlocking via the error emitter.
    addDocumentNonBlocking(coverLettersRef, {
      title,
      content,
      lastUpdated: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving cover letter:', error);
    // This top-level catch is for synchronous errors during initialization.
    // Firestore permission errors will be handled by the non-blocking function.
    throw new Error('Failed to save cover letter. Please try again.');
  }
}

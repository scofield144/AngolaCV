
'use server';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
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

    await addDocumentNonBlocking(coverLettersRef, {
      title,
      content,
      lastUpdated: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving cover letter:', error);
    throw new Error('Failed to save cover letter. Please try again.');
  }
}

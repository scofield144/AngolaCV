
'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

// Define the shape of the user profile
interface UserProfile {
    id: string;
    role: 'personal' | 'recruiter';
    firstName: string;
    lastName: string;
    email: string;
}

export function useUserProfile() {
  const { user } = useUser();
  const firestore = useFirestore();

  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    // Path to the user's profile document
    return doc(firestore, `users/${user.uid}/profile`);
  }, [user, firestore]);

  const { data, isLoading, error } = useDoc<UserProfile>(profileRef);

  return {
    profile: data,
    isLoading: isLoading,
    error: error,
  };
}

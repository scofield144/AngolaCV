
'use client';

import { useState } from 'react';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Edit,
  Eye,
  Trash2,
  FileText,
  Loader2,
  PlusCircle,
  FilePlus,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

interface DocumentItem {
  id: string;
  title: string;
  lastUpdated: any; // Can be a Firestore Timestamp
}

function DocumentListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20 ml-2" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center min-h-[200px]">
      <FilePlus className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <Button asChild>
        <Link href={buttonLink}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}

export default function MyLibraryPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const cvsCollectionRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'cvs');
  }, [user, firestore]);

  const coverLettersCollectionRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'coverLetters');
  }, [user, firestore]);

  const { data: cvs, isLoading: isLoadingCvs } = useCollection<DocumentItem>(cvsCollectionRef);
  const { data: coverLetters, isLoading: isLoadingCoverLetters } = useCollection<DocumentItem>(coverLettersCollectionRef);

  const handleDelete = async (collectionName: string, id: string) => {
    if (!user || !firestore) return;
    try {
      await deleteDoc(doc(firestore, 'users', user.uid, collectionName, id));
      toast({
        title: 'Document Deleted',
        description: 'The document has been successfully removed.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Deleting Document',
        description: 'There was a problem removing the document. Please try again.',
      });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) {
      return 'Just now';
    }
    return new Date(timestamp.toDate()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderDocumentList = (
    documents: DocumentItem[] | null,
    isLoading: boolean,
    type: 'cv' | 'cover-letter'
  ) => {
    if (isLoading) {
      return <DocumentListSkeleton />;
    }

    const collectionName = type === 'cv' ? 'cvs' : 'coverLetters';
    const emptyTitle = type === 'cv' ? 'No CVs Found' : 'No Cover Letters Found';
    const emptyDescription = type === 'cv' ? 'You haven’t created any CVs yet.' : 'You haven’t created any cover letters yet.';
    const emptyButtonText = type === 'cv' ? 'Create a New CV' : 'Create a New Cover Letter';
    const emptyButtonLink = type === 'cv' ? '/dashboard/cv-editor' : '/dashboard/cover-letters';
    const editLink = type === 'cv' ? '/dashboard/cv-editor' : '/dashboard/cover-letters';

    if (!documents || documents.length === 0) {
      return <EmptyState title={emptyTitle} description={emptyDescription} buttonText={emptyButtonText} buttonLink={emptyButtonLink} />;
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((docItem) => (
          <Card key={docItem.id}>
            <CardHeader>
              <CardTitle className="truncate">{docItem.title || `Untitled ${type}`}</CardTitle>
              <CardDescription>
                Last updated: {formatDate(docItem.lastUpdated)}
              </CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`${editLink}?id=${docItem.id}`}>
                  <Edit className="mr-2" /> Edit
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <Trash2 className="mr-2" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your document.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(collectionName, docItem.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">My Library</h1>
        <p className="text-muted-foreground">
          Browse, edit, and manage all your saved CVs and cover letters.
        </p>
      </div>
      <Tabs defaultValue="cvs">
        <TabsList>
          <TabsTrigger value="cvs">
            <FileText className="mr-2" /> My CVs
          </TabsTrigger>
          <TabsTrigger value="cover-letters">
            <FileText className="mr-2" /> My Cover Letters
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cvs" className="mt-6">
          {renderDocumentList(cvs, isLoadingCvs, 'cv')}
        </TabsContent>
        <TabsContent value="cover-letters" className="mt-6">
          {renderDocumentList(coverLetters, isLoadingCoverLetters, 'cover-letter')}
        </TabsContent>
      </Tabs>
    </div>
  );
}

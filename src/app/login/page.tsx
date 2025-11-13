"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Loader2, Mail, Lock, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { useUser, useAuth } from '@/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInAnonymously
} from 'firebase/auth';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const [email, setEmail] = useState('test@loneus.com');
  const [password, setPassword] = useState('password');
  const [isAuthActionLoading, setIsAuthActionLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleAuthAction = async (action: 'login' | 'signup' | 'anonymous') => {
    setIsAuthActionLoading(true);

    try {
      if (action === 'anonymous') {
        await signInAnonymously(auth);
        toast({
          title: "Continuing as Guest",
          description: "You are browsing as a guest.",
        });
        router.push('/dashboard');
        return;
      }
      
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      if (password.length < 4) {
        throw new Error('Password must be at least 4 characters long.');
      }

      if (action === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      
      const title = action === 'login' ? "Login Successful" : "Sign Up Successful";
      toast({
        title: title,
        description: "Welcome! Redirecting you to your dashboard.",
      });
      router.push('/dashboard');

    } catch (error: any) {
       let description = "An unexpected error occurred. Please try again.";
       if (error.code) {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              description = 'Invalid email or password. Please try again.';
              break;
            case 'auth/email-already-in-use':
              description = 'An account with this email already exists. Please log in.';
              break;
            case 'auth/invalid-email':
              description = 'The email address is not valid.';
              break;
            default:
              description = error.message;
          }
       } else if (error.message) {
         description = error.message;
       }

      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: description,
      });
      setIsAuthActionLoading(false);
    }
  };

  if (isUserLoading || user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your session...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-4">
      <Link href="/" className="flex items-center gap-3 font-headline text-3xl font-bold text-primary">
        <Building2 className="h-8 w-8" />
        <h1>Loneus</h1>
      </Link>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Get instant access for testing purposes or log in with your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <Button className="w-full" onClick={() => handleAuthAction('anonymous')} disabled={isAuthActionLoading}>
                {isAuthActionLoading ? <Loader2 className="animate-spin" /> : <User className="mr-2" />}
                Continue as Guest (Easy Access)
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                        Or with an account
                    </span>
                </div>
            </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isAuthActionLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={isAuthActionLoading}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => handleAuthAction('login')} disabled={isAuthActionLoading || !email || !password}>
              {isAuthActionLoading && <Loader2 className="animate-spin" />}
              Login
            </Button>
            <Button variant="secondary" onClick={() => handleAuthAction('signup')} disabled={isAuthActionLoading || !email || !password}>
              {isAuthActionLoading && <Loader2 className="animate-spin" />}
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

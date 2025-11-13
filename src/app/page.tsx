"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Loader2, Mail, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from '@/firebase';

export default function Home() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthActionLoading, setIsAuthActionLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleAuthAction = async (action: 'login' | 'signup' | 'anonymous') => {
    setIsAuthActionLoading(true);

    // Add a small delay to give Firebase time to create/log in the user
    // and for the onAuthStateChanged listener to fire.
    const redirectWithDelay = () => {
      setTimeout(() => {
        router.push('/dashboard');
        toast({
          title: "Welcome!",
          description: "You've been successfully signed in.",
        });
      }, 1000); 
    };

    try {
      if (action === 'anonymous') {
        initiateAnonymousSignIn(auth);
        redirectWithDelay();
        return;
      }

      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      if (action === 'login') {
        initiateEmailSignIn(auth, email, password);
      } else {
        initiateEmailSignUp(auth, email, password);
      }
      redirectWithDelay();

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
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
      <div className="flex items-center gap-3 font-headline text-3xl font-bold text-primary">
        <Building2 className="h-8 w-8" />
        <h1>AngolaCV Pro</h1>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Button onClick={() => handleAuthAction('login')} disabled={isAuthActionLoading}>
              {isAuthActionLoading && <Loader2 className="animate-spin" />}
              Login
            </Button>
            <Button variant="secondary" onClick={() => handleAuthAction('signup')} disabled={isAuthActionLoading}>
              {isAuthActionLoading && <Loader2 className="animate-spin" />}
              Sign Up
            </Button>
          </div>
          <Button variant="link" className="w-full" onClick={() => handleAuthAction('anonymous')} disabled={isAuthActionLoading}>
            Continue as Guest
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

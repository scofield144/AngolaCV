"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Loader2, Mail, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';

export default function Home() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthActionLoading, setIsAuthActionLoading] = useState(false);

  useEffect(() => {
    // This will now only redirect if a real user session exists (e.g., from a previous login)
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleAuthAction = async (action: 'login' | 'signup' | 'anonymous') => {
    setIsAuthActionLoading(true);

    try {
      if (action === 'anonymous') {
        // Mock anonymous login
        setTimeout(() => {
           toast({
            title: "Continuing as Guest",
            description: "You are browsing as a guest.",
          });
          router.push('/dashboard');
        }, 500);
        return;
      }
      
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      // Simulate a successful auth action
      setTimeout(() => {
        const title = action === 'login' ? "Login Successful" : "Sign Up Successful";
        toast({
          title: title,
          description: "Welcome! You've been successfully signed in.",
        });
        router.push('/dashboard');
      }, 1000);

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
          <CardTitle>Welcome</CardTitle>
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

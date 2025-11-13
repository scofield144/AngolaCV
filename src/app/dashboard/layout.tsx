"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Header } from "@/components/dashboard/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for mocked auth
  const router = useRouter();

  // This layout is now simplified for fictional auth.
  // When you re-enable Firebase, you can swap this back to use `useUser`.
  
  // const { user, isUserLoading } = useUser();
  // useEffect(() => {
  //   if (!isUserLoading && !user) {
  //     router.replace('/');
  //   }
  // }, [user, isUserLoading, router]);

  // if (isUserLoading || !user) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center bg-background">
  //       <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //     </div>
  //   );
  // }

  return (
    <SidebarProvider>
      <DashboardNav />
      <SidebarInset>
        <Header />
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

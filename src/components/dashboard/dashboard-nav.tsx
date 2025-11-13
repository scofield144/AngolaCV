"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Home,
  Library,
  Settings,
  PlusCircle,
  Share2,
  Briefcase,
  CheckCircle,
  Search,
  Building,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { ShareProfileDialog } from "./share-profile-dialog";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Skeleton } from "../ui/skeleton";

const personalNav = [
  { href: "/dashboard", icon: Home, label: "My Europass" },
  { href: "/dashboard/my-library", icon: Library, label: "My Library" },
  { href: "/dashboard/my-skills", icon: CheckCircle, label: "My Skills" },
  { href: "/dashboard/my-interests", icon: Users, label: "My Interests"},
  { href: "/dashboard/my-applications", icon: Briefcase, label: "My Applications" },
];

const personalFeatures = [
  { href: "/dashboard/cv-editor", icon: PlusCircle, label: "Create CV" },
  { href: "/dashboard/cover-letters", icon: FileText, label: "Create Cover Letter" },
  { href: "/dashboard/ats-checker", icon: CheckCircle, label: "ATS Checker" },
  { href: "/dashboard/job-board", icon: Briefcase, label: "Job Board" },
];

const recruiterNav = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/candidate-search", icon: Search, label: "Candidate Search" },
    { href: "/dashboard/company-profile", icon: Building, label: "Company Profile" },
    { href: "/dashboard/job-board", icon: Briefcase, label: "Job Board" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { profile, isLoading } = useUserProfile();

  const isRecruiter = profile?.role === 'recruiter';

  const NavLinks = isRecruiter ? recruiterNav : personalNav;
  const FeatureLinks = isRecruiter ? [] : personalFeatures;

  const renderSkeleton = () => (
    <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
    </div>
  );


  return (
    <Sidebar collapsible="icon" variant="inset" side="left">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? renderSkeleton() : (
            <>
                <SidebarGroup>
                <SidebarGroupLabel>{isRecruiter ? "Recruiter Tools" : "Navigation"}</SidebarGroupLabel>
                <SidebarMenu>
                    {NavLinks.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={pathname === item.href}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                </SidebarGroup>
                
                {!isRecruiter && FeatureLinks.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Features</SidebarGroupLabel>
                        <SidebarMenu>
                            {FeatureLinks.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <Link href={item.href}>
                                <SidebarMenuButton
                                    isActive={pathname.startsWith(item.href)}
                                    tooltip={item.label}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <ShareProfileDialog>
                                    <SidebarMenuButton tooltip="Share My Profile">
                                        <Share2 />
                                        <span>Share My Profile</span>
                                    </SidebarMenuButton>
                                </ShareProfileDialog>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                )}
             </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard/settings">
              <SidebarMenuButton 
                isActive={pathname === "/dashboard/settings"}
                tooltip="Settings"
                >
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

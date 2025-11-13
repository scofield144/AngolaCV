"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Heart,
  Home,
  Library,
  Lightbulb,
  Send,
  Settings,
  Star,
  Briefcase,
} from "lucide-react";

import { cn } from "@/lib/utils";
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

const mainNav = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/job-board", icon: Briefcase, label: "Job Board" },
  { href: "/dashboard/my-library", icon: Library, label: "My Library" },
  { href: "/dashboard/my-skills", icon: Star, label: "My Skills" },
  { href: "/dashboard/my-interests", icon: Heart, label: "My Interests" },
  { href: "/dashboard/my-applications", icon: Send, label: "My Applications" },
];

const featuresNav = [
  { href: "/dashboard/cv-editor", icon: FileText, label: "CV Editor" },
  { href: "/dashboard/cover-letters", icon: FileText, label: "Cover Letters" },
  { href: "/dashboard/ats-checker", icon: Lightbulb, label: "ATS Checker" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset" side="left">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
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
        <SidebarGroup>
          <SidebarGroupLabel>Features</SidebarGroupLabel>
          <SidebarMenu>
            {featuresNav.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
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
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard/settings" legacyBehavior passHref>
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

"use client";

import { LogOut, Settings, User as UserIcon, ShieldQuestion } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { signOut } from "firebase/auth";
import { useUserProfile } from "@/hooks/use-user-profile";

export function UserNav() {
  const auth = useAuth();
  const { user } = useUser();
  const { profile } = useUserProfile();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return "G"; // Guest
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    if (names[0]) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return "G";
  }

  const displayName = user?.isAnonymous 
      ? "Guest User" 
      : profile?.firstName && profile?.lastName 
      ? `${profile.firstName} ${profile.lastName}`
      : user?.displayName || user?.email || "User";

  const email = user?.isAnonymous ? "guest@loneus.com" : user?.email || "";
  const isAnonymous = user?.isAnonymous ?? false;
  const profileLink = profile?.role === 'recruiter' ? "/dashboard/company-profile" : "/dashboard/cv-editor";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            {user && !user.isAnonymous && user.photoURL && (
                <AvatarImage src={user.photoURL} alt={displayName} />
            )}
            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
             <p className="text-sm font-medium leading-none">{displayName}</p>
             <p className="text-xs leading-none text-muted-foreground">
               {email}
             </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <Link href={profileLink}>
              <DropdownMenuItem>
                <UserIcon className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/settings">
              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
             {isAnonymous && (
              <DropdownMenuItem disabled>
                <ShieldQuestion className="mr-2" />
                <span>Anonymous Mode</span>
              </DropdownMenuItem>
            )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

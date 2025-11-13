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
import { useAuth, useUser } from "@/firebase";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export function UserNav() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
      });
    }
  };
  
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-small');

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            {user && !user.isAnonymous && user.photoURL && (
                <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
            )}
            {userAvatar && (
                <AvatarImage src={userAvatar.imageUrl} data-ai-hint={userAvatar.imageHint} alt="User" />
            )}
            <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {user?.isAnonymous ? (
              <p className="text-sm font-medium leading-none">Guest User</p>
            ) : (
              <>
                <p className="text-sm font-medium leading-none">{user?.displayName || "User"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <Link href="/dashboard/cv-editor">
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
             {user?.isAnonymous && (
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

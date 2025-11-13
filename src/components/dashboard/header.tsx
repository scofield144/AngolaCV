import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/dashboard/user-nav";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { ShareProfileDialog } from "./share-profile-dialog";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1" />
      <ShareProfileDialog>
        <Button>
          <Share2 className="mr-2" />
          Share Profile
        </Button>
      </ShareProfileDialog>
      <UserNav />
    </header>
  );
}

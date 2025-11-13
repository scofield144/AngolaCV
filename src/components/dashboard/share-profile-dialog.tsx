"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export function ShareProfileDialog({ children }: { children: React.ReactNode }) {
  const [hasCopied, setHasCopied] = useState(false);
  const [shareableLink, setShareableLink] = useState('');

  useEffect(() => {
    // This ensures window is defined, preventing hydration errors
    setShareableLink(`${window.location.origin}/p/johndoe`);
  }, []);

  const copyToClipboard = () => {
    if (!shareableLink) return;
    navigator.clipboard.writeText(shareableLink);
    setHasCopied(true);
    toast({
        title: "Copied to clipboard!",
        description: "You can now share your profile link.",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Profile</DialogTitle>
          <DialogDescription>
            Anyone with this link will be able to view your public profile.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={shareableLink}
              readOnly
            />
          </div>
          <Button type="button" size="icon" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
            <p className="text-sm text-muted-foreground">Profile views: 0 (tracking coming soon)</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

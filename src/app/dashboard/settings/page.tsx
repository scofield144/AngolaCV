"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold font-headline mb-6">Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Visibility</CardTitle>
                    <CardDescription>
                        Control who can find your profile on AngolaCV Pro.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between space-x-2 rounded-lg border bg-card p-4 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="profile-visibility" className="text-base font-medium">Make my profile searchable</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow recruiters and companies to find your profile in searches.
                            </p>
                        </div>
                        <Switch id="profile-visibility" aria-label="Toggle profile visibility" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

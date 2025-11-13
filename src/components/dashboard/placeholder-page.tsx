import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { HardHat } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg bg-card">
            <HardHat className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">This feature is currently under development.</p>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MealPlanCardProps {
  id: string;
  title: string;
  status?: "active" | "completed";
  date: string;
  image: string;
  onClick?: () => void;
  variant?: "default" | "compact";
}

export function MealPlanCard({
  title,
  status,
  date,
  image,
  onClick,
  variant = "default",
}: MealPlanCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden border-none",
        variant === "compact" && "flex items-center gap-4 p-4"
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {variant === "default" ? (
        <>
          <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 space-y-3">
            {status && (
              <Badge
                variant={status === "active" ? "default" : "secondary"}
                className={cn(
                  "text-xs",
                  status === "active" && "bg-accent hover:bg-accent/90"
                )}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            )}
            <div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
            <Button onClick={onClick} variant="outline" className="w-full">
              View
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <div 
            className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
            style={{ 
              background: "linear-gradient(135deg, hsl(var(--teal-dark)), hsl(var(--primary)))"
            }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </>
      )}
    </Card>
  );
}

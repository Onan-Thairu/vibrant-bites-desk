import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MealPlanCardProps {
  id: string;
  title: string;
  status?: "active";
  traineeCount?: number;
  image: string;
  onClick?: () => void;
  onStartPlan?: () => void;
  variant?: "default" | "compact";
  showStartButton?: boolean;
}

export function MealPlanCard({
  title,
  status,
  traineeCount = 0,
  image,
  onClick,
  onStartPlan,
  variant = "default",
  showStartButton = false,
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
            <div className="flex items-center justify-between">
              {status && (
                <Badge
                  variant="default"
                  className="text-xs bg-accent hover:bg-accent/90"
                >
                  Active
                </Badge>
              )}
              {traineeCount > 0 && (
                <span className="text-sm text-muted-foreground">
                  {traineeCount} {traineeCount === 1 ? 'trainee' : 'trainees'}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
            </div>
            {showStartButton ? (
              <Button onClick={onStartPlan} className="w-full">
                Start Meal Plan
              </Button>
            ) : (
              <Button onClick={onClick} variant="outline" className="w-full">
                View
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {traineeCount} {traineeCount === 1 ? 'trainee' : 'trainees'}
            </p>
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

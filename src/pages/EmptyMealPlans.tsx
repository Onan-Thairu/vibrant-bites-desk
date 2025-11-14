import { Button } from "@/components/ui/button";
import { Plus, UtensilsCrossed } from "lucide-react";
import emptyMealPlans from "@/assets/empty-meal-plans.jpg";

export default function EmptyMealPlans() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center py-12 max-w-md mx-auto px-4">
        <img 
          src={emptyMealPlans} 
          alt="No meal plans" 
          className="w-full max-w-sm mx-auto mb-6 rounded-lg"
        />
        <div className="flex items-center justify-center gap-2 mb-2">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">No Meal Plans Yet</h1>
        </div>
        <p className="text-muted-foreground mb-6 text-lg">
          Create your first meal plan to start helping your trainees achieve their nutrition goals
        </p>
        <Button size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Create Your First Plan
        </Button>
      </div>
    </div>
  );
}

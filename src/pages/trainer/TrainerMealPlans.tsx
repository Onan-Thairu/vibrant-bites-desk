import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MealPlanCard } from "@/components/MealPlanCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import mealPlan1 from "@/assets/meal-plan-1.jpg";
import mealPlan2 from "@/assets/meal-plan-2.jpg";
import mealPlan3 from "@/assets/meal-plan-3.jpg";

export default function TrainerMealPlans() {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  
  const [mealPlans, setMealPlans] = useState([
    {
      id: "1",
      title: "Weight Loss Plan",
      status: "active" as const,
      date: "Jan 15 - Feb 15, 2025",
      image: mealPlan1,
    },
    {
      id: "2",
      title: "Muscle Gain Plan",
      status: "active" as const,
      date: "Jan 10 - Feb 10, 2025",
      image: mealPlan2,
    },
    {
      id: "3",
      title: "Maintenance Plan",
      status: "completed" as const,
      date: "Dec 1 - Dec 31, 2024",
      image: mealPlan3,
    },
  ]);

  const handleDeleteClick = (planId: string) => {
    setSelectedPlanId(planId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPlanId) {
      setMealPlans(mealPlans.filter(plan => plan.id !== selectedPlanId));
      toast.success("Meal plan deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Meal Plans</h1>
          <Button onClick={() => navigate("/trainer/plans/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {mealPlans.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {mealPlans.map((plan) => (
                <CarouselItem key={plan.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative group">
                    <MealPlanCard
                      {...plan}
                      onClick={() => navigate(`/trainer/plans/${plan.id}`)}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(plan.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No meal plans yet</p>
            <Button onClick={() => navigate("/trainer/plans/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Plan
            </Button>
          </div>
        )}
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Meal Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this meal plan? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

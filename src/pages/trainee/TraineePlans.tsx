import { BottomNav } from "@/components/BottomNav";
import { MealPlanCard } from "@/components/MealPlanCard";
import { useNavigate } from "react-router-dom";
import mealPlan1 from "@/assets/meal-plan-1.jpg";
import mealPlan2 from "@/assets/meal-plan-2.jpg";
import mealPlan3 from "@/assets/meal-plan-3.jpg";
import emptyMealPlans from "@/assets/empty-meal-plans.jpg";

const currentPlan = {
  id: "1",
  title: "Summer Shred 2024",
  status: "active" as const,
  image: mealPlan1,
  started: true,
};

const pastPlans = [
  {
    id: "2",
    title: "30-Day Fitness Challenge",
    image: mealPlan2,
    started: false,
  },
  {
    id: "3",
    title: "Quick Start Diet",
    image: mealPlan3,
    started: false,
  },
];

export default function TraineePlans() {
  const navigate = useNavigate();

  const handleStartPlan = (planId: string) => {
    console.log("Starting plan:", planId);
    // TODO: Add logic to start the meal plan
  };


  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Meal Plans</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {currentPlan ? (
          <>
            {/* Current Plan Section */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
              <MealPlanCard
                {...currentPlan}
                onClick={() => navigate(`/trainee/plans/${currentPlan.id}`)}
                onStartPlan={() => handleStartPlan(currentPlan.id)}
              />
            </section>

            {/* Past Plans Section */}
            {pastPlans.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4">Past Plans</h2>
                <div className="space-y-4">
                  {pastPlans.map((plan) => (
                    <MealPlanCard
                      key={plan.id}
                      {...plan}
                      onClick={() => navigate(`/trainee/plans/${plan.id}`)}
                      onStartPlan={() => handleStartPlan(plan.id)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-12 max-w-md mx-auto">
            <img 
              src={emptyMealPlans} 
              alt="No meal plans" 
              className="w-full max-w-sm mx-auto mb-6 rounded-lg"
            />
            <h2 className="text-2xl font-bold mb-2">No Meal Plans Yet</h2>
            <p className="text-muted-foreground mb-6">
              Your trainer hasn't assigned any meal plans yet. Check back soon!
            </p>
          </div>
        )}
      </main>

      <BottomNav userRole="trainee" />
    </div>
  );
}

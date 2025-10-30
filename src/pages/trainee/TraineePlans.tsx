import { BottomNav } from "@/components/BottomNav";
import { MealPlanCard } from "@/components/MealPlanCard";
import { useNavigate } from "react-router-dom";
import mealPlan1 from "@/assets/meal-plan-1.jpg";
import mealPlan2 from "@/assets/meal-plan-2.jpg";
import mealPlan3 from "@/assets/meal-plan-3.jpg";

const currentPlan = {
  id: "1",
  title: "Summer Shred 2024",
  status: "active" as const,
  date: "Started July 1st",
  image: mealPlan1,
};

const pastPlans = [
  {
    id: "2",
    title: "30-Day Fitness Challenge",
    status: "completed" as const,
    date: "Completed June 30th",
    image: mealPlan2,
  },
  {
    id: "3",
    title: "Quick Start Diet",
    status: "completed" as const,
    date: "Completed May 15th",
    image: mealPlan3,
  },
];

export default function TraineePlans() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Meal Plans</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Current Plan Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
          <MealPlanCard
            {...currentPlan}
            onClick={() => navigate(`/trainee/plans/${currentPlan.id}`)}
          />
        </section>

        {/* Past Plans Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Past Plans</h2>
          <div className="space-y-4">
            {pastPlans.map((plan) => (
              <MealPlanCard
                key={plan.id}
                {...plan}
                onClick={() => navigate(`/trainee/plans/${plan.id}`)}
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNav userRole="trainee" />
    </div>
  );
}

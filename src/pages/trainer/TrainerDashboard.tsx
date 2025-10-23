import { BottomNav } from "@/components/BottomNav";
import { StatCard } from "@/components/StatCard";
import { MealPlanCard } from "@/components/MealPlanCard";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mealPlan1 from "@/assets/meal-plan-1.jpg";
import mealPlan2 from "@/assets/meal-plan-2.jpg";
import mealPlan3 from "@/assets/meal-plan-3.jpg";

const mockMealPlans = [
  {
    id: "1",
    title: "High-Protein Diet",
    date: "Created: 2024-01-15",
    image: mealPlan1,
  },
  {
    id: "2",
    title: "Vegan Meal Plan",
    date: "Created: 2023-12-20",
    image: mealPlan2,
  },
  {
    id: "3",
    title: "Low-Carb Diet",
    date: "Created: 2023-11-05",
    image: mealPlan3,
  },
];

export default function TrainerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Meal Plans</h1>
          <Button
            size="icon"
            className="bg-accent hover:bg-accent/90"
            onClick={() => navigate("/trainer/plans/create")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Overview Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard label="Total Plans" value={24} icon={FileText} />
            <StatCard label="Active Employees" value={150} icon={Users} />
          </div>
          <StatCard label="Avg. Engagement" value="85%" icon={TrendingUp} />
        </section>

        {/* My Meal Plans Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">My Meal Plans</h2>
          <div className="space-y-4">
            {mockMealPlans.map((plan) => (
              <MealPlanCard
                key={plan.id}
                {...plan}
                variant="compact"
                onClick={() => navigate(`/trainer/plans/${plan.id}`)}
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}

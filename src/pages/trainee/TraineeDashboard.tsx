import { BottomNav } from "@/components/BottomNav";
import { MealPlanCard } from "@/components/MealPlanCard";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Utensils, TrendingUp, Calendar } from "lucide-react";
import mealPlan1 from "@/assets/meal-plan-1.jpg";

const currentPlan = {
  id: "1",
  title: "7-Day Weight Loss Plan",
  status: "active" as const,
  date: "Week of July 15th",
  image: mealPlan1,
};

export default function TraineeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Progress Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Meals Completed"
            value="12/21"
            icon={Utensils}
          />
          <StatCard
            label="Current Streak"
            value="5 days"
            icon={TrendingUp}
          />
          <StatCard
            label="Plan Duration"
            value="7 days"
            icon={Calendar}
          />
        </section>

        {/* Completion Progress */}
        <section>
          <Card className="p-6 border-none" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Overall Progress</h3>
                <span className="text-2xl font-bold text-primary">57%</span>
              </div>
              <Progress value={57} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Keep up the great work! You're more than halfway through your plan.
              </p>
            </div>
          </Card>
        </section>

        {/* Current Plan Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Current Meal Plan</h2>
          <MealPlanCard
            {...currentPlan}
            onClick={() => navigate(`/trainee/plans/${currentPlan.id}`)}
          />
        </section>
      </main>

      <BottomNav userRole="trainee" />
    </div>
  );
}

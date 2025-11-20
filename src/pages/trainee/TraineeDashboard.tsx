import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { MealPlanCard } from "@/components/MealPlanCard";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Utensils, TrendingUp, Calendar } from "lucide-react";
import mealPlan1 from "@/assets/meal-plan-1.jpg";
import mealPlan2 from "@/assets/meal-plan-2.jpg";
import mealPlan3 from "@/assets/meal-plan-3.jpg";

const mealPlans = [
  {
    id: "1",
    title: "7-Day Weight Loss Plan",
    status: "active" as const,
    date: "Week of July 15th",
    image: mealPlan1,
    started: true,
    stats: {
      mealsCompleted: "12/21",
      currentStreak: "5 days",
      planDuration: "7 days",
      overallProgress: 57,
    }
  },
  {
    id: "2",
    title: "Muscle Building Plan",
    date: "Week of July 22nd",
    image: mealPlan2,
    started: false,
  },
  {
    id: "3",
    title: "Balanced Nutrition Plan",
    date: "Week of July 29th",
    image: mealPlan3,
    started: false,
  },
];

export default function TraineeDashboard() {
  const navigate = useNavigate();
  const [selectedPlanId, setSelectedPlanId] = useState(mealPlans[0].id);
  const selectedPlan = mealPlans.find(plan => plan.id === selectedPlanId) || mealPlans[0];

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Meal Plan Selector */}
        {mealPlans.length > 1 && (
          <section className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Meal Plan</label>
            <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a meal plan" />
              </SelectTrigger>
              <SelectContent>
                {mealPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        )}

        {/* Progress Stats - Only show if plan is started */}
        {selectedPlan.started && selectedPlan.stats && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Meals Completed"
              value={selectedPlan.stats.mealsCompleted}
              icon={Utensils}
            />
            <StatCard
              label="Current Streak"
              value={selectedPlan.stats.currentStreak}
              icon={TrendingUp}
            />
            <StatCard
              label="Plan Duration"
              value={selectedPlan.stats.planDuration}
              icon={Calendar}
            />
          </section>
        )}

        {/* Completion Progress - Only show if plan is started */}
        {selectedPlan.started && selectedPlan.stats && (
          <section>
            <Card className="p-6 border-none" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Overall Progress</h3>
                  <span className="text-2xl font-bold text-primary">{selectedPlan.stats.overallProgress}%</span>
                </div>
                <Progress value={selectedPlan.stats.overallProgress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Keep up the great work! You're more than halfway through your plan.
                </p>
              </div>
            </Card>
          </section>
        )}

        {/* Current Plan Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            {selectedPlan.started ? "Current Meal Plan" : "Meal Plan"}
          </h2>
          <MealPlanCard
            id={selectedPlan.id}
            title={selectedPlan.title}
            image={selectedPlan.image}
            status={selectedPlan.started ? "active" : undefined}
            started={selectedPlan.started}
            showStartButton={!selectedPlan.started}
            onClick={() => navigate(`/trainee/plans/${selectedPlan.id}`)}
          />
        </section>
      </main>

      <BottomNav userRole="trainee" />
    </div>
  );
}

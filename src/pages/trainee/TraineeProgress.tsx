import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, TrendingUp, Target, Award } from "lucide-react";

const mealPlans = [
  { 
    id: "1", 
    name: "Weight Loss Plan",
    stats: {
      currentStreak: 5,
      totalMealsCompleted: 42,
      weeklyCompletion: 85,
      monthlyGoal: 120,
      completedThisMonth: 89,
    }
  },
  { 
    id: "2", 
    name: "Muscle Gain Plan",
    stats: {
      currentStreak: 3,
      totalMealsCompleted: 28,
      weeklyCompletion: 72,
      monthlyGoal: 100,
      completedThisMonth: 56,
    }
  },
];

export default function TraineeProgress() {
  const [selectedPlanId, setSelectedPlanId] = useState(mealPlans[0].id);
  const selectedPlan = mealPlans.find(plan => plan.id === selectedPlanId) || mealPlans[0];
  const progressStats = selectedPlan.stats;
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <MobileHeader title="My Progress" />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Meal Plan Selector */}
        {mealPlans.length > 1 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Meal Plan</label>
            <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a meal plan" />
              </SelectTrigger>
              <SelectContent>
                {mealPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{progressStats.currentStreak}</p>
              <p className="text-xs text-muted-foreground">days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Meals Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{progressStats.totalMealsCompleted}</p>
              <p className="text-xs text-muted-foreground">total</p>
            </CardContent>
          </Card>
        </div>

        {/* Completion Percentage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Completion Percentage
              </span>
              <Badge variant="secondary">{progressStats.weeklyCompletion}%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressStats.weeklyCompletion} className="h-3" />
          </CardContent>
        </Card>

        {/* Monthly Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Monthly Goal
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                {progressStats.completedThisMonth} / {progressStats.monthlyGoal} meals
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(progressStats.completedThisMonth / progressStats.monthlyGoal) * 100} 
              className="h-3" 
            />
          </CardContent>
        </Card>

      </main>

      <BottomNav userRole="trainee" />
    </div>
  );
}

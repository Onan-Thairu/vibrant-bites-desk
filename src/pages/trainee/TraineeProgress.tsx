import { BottomNav } from "@/components/BottomNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Target, Award } from "lucide-react";

const progressStats = {
  currentStreak: 5,
  totalMealsCompleted: 42,
  weeklyCompletion: 85,
  monthlyGoal: 120,
  completedThisMonth: 89,
};

const recentActivity = [
  { date: "Today", meals: 3, calories: 1850, target: 2000 },
  { date: "Yesterday", meals: 3, calories: 2100, target: 2000 },
  { date: "2 days ago", meals: 2, calories: 1600, target: 2000 },
  { date: "3 days ago", meals: 3, calories: 1950, target: 2000 },
];

export default function TraineeProgress() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <MobileHeader title="My Progress" />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
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

        {/* Weekly Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Completion
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

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{day.date}</span>
                  <span className="text-sm text-muted-foreground">
                    {day.meals} meals • {day.calories} / {day.target} cal
                  </span>
                </div>
                <Progress 
                  value={(day.calories / day.target) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNav userRole="trainee" />
    </div>
  );
}

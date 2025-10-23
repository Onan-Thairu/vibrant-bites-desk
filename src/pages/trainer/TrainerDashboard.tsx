import { BottomNav } from "@/components/BottomNav";
import { StatCard } from "@/components/StatCard";
import { MealPlanCard } from "@/components/MealPlanCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FileText, Users, TrendingUp, Search, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import mealPlan1 from "@/assets/meal-plan-1.jpg";
import mealPlan2 from "@/assets/meal-plan-2.jpg";
import mealPlan3 from "@/assets/meal-plan-3.jpg";
import { toast } from "sonner";

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
  const location = useLocation();
  const currentView = location.pathname.includes("/employees") ? "employees" : "plans";
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeletePlan = (planId: string) => {
    toast.success("Meal plan deleted successfully");
  };

  const filteredMealPlans = mockMealPlans.filter((plan) =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold mb-4">
            {currentView === "plans" ? "Meal Plans" : "Employees"}
          </h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${currentView}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {currentView === "plans" ? (
          <>
            {/* Overview Section */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Total Plans" value={24} icon={FileText} />
                <StatCard label="Active Employees" value={150} icon={Users} />
                <StatCard label="Engagement" value="85%" icon={TrendingUp} />
              </div>
            </section>

            {/* My Meal Plans Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">My Meal Plans</h2>
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90"
                  onClick={() => navigate("/trainer/plans/create")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Create
                </Button>
              </div>
              
              {/* Horizontal Scrolling Meal Cards */}
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {filteredMealPlans.map((plan) => (
                  <div key={plan.id} className="flex-shrink-0 w-72 relative group">
                    <MealPlanCard
                      {...plan}
                      variant="default"
                      onClick={() => navigate(`/trainer/plans/${plan.id}`)}
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlan(plan.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">All Employees</h2>
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90"
                onClick={() => navigate("/trainer/employees/invite")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </div>
            <div className="space-y-3">
              {/* Employee list will be rendered here */}
              <p className="text-muted-foreground text-center py-8">
                Employee management coming soon
              </p>
            </div>
          </section>
        )}
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}

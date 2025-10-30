import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerMealPlans from "./pages/trainer/TrainerMealPlans";
import TraineeDashboard from "./pages/trainee/TraineeDashboard";
import TraineePlans from "./pages/trainee/TraineePlans";
import TraineeProgress from "./pages/trainee/TraineeProgress";
import TrainerTraineeProgress from "./pages/trainer/TraineeProgress";
import MealPlanDetails from "./pages/MealPlanDetails";
import MealDetails from "./pages/MealDetails";
import CreateMealPlan from "./pages/CreateMealPlan";
import ConfigureDayMeals from "./pages/trainer/ConfigureDayMeals";
import TraineesManagement from "./pages/trainer/TraineesManagement";
import InviteTrainee from "./pages/trainer/InviteTrainee";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const isTrainerRoute = window.location.pathname.startsWith("/trainer");
  const isTraineeRoute = window.location.pathname.startsWith("/trainee");
  const showSidebar = isTrainerRoute || isTraineeRoute;
  const userRole = isTrainerRoute ? "trainer" : "trainee";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showSidebar ? (
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <AppSidebar userRole={userRole} />
                <div className="flex-1">
                  <Routes>
                    {/* Trainer Routes */}
                    <Route path="/trainer" element={<TrainerDashboard />} />
                    <Route path="/trainer/plans" element={<TrainerMealPlans />} />
              <Route path="/trainer/plans/create" element={<CreateMealPlan />} />
              <Route path="/trainer/plans/create/day/:dayNumber" element={<ConfigureDayMeals />} />
                    <Route path="/trainer/plans/:id" element={<MealPlanDetails />} />
                    <Route path="/trainer/plans/:id/meal/:mealId" element={<MealDetails />} />
                    <Route path="/trainer/trainees" element={<TraineesManagement />} />
                    <Route path="/trainer/trainees/invite" element={<InviteTrainee />} />
                    <Route path="/trainer/trainees/:traineeId/progress" element={<TrainerTraineeProgress />} />
                    
                    {/* Trainee Routes */}
                    <Route path="/trainee" element={<TraineeDashboard />} />
                    <Route path="/trainee/plans" element={<TraineePlans />} />
                    <Route path="/trainee/plans/:id" element={<MealPlanDetails />} />
                    <Route path="/trainee/plans/:id/meal/:mealId" element={<MealDetails />} />
                    <Route path="/trainee/progress" element={<TraineeProgress />} />
                    
                    {/* Shared Routes */}
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            </SidebarProvider>
          ) : (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MealPlanDetails from "./pages/MealPlanDetails";
import MealDetails from "./pages/MealDetails";
import CreateMealPlan from "./pages/CreateMealPlan";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Trainer Routes */}
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/trainer/plans" element={<TrainerDashboard />} />
          <Route path="/trainer/plans/create" element={<CreateMealPlan />} />
          <Route path="/trainer/plans/:id" element={<MealPlanDetails />} />
          <Route path="/trainer/plans/:id/meal/:mealId" element={<MealDetails />} />
          <Route path="/trainer/employees" element={<TrainerDashboard />} />
          
          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/plans" element={<EmployeeDashboard />} />
          <Route path="/employee/plans/:id" element={<MealPlanDetails />} />
          <Route path="/employee/plans/:id/meal/:mealId" element={<MealDetails />} />
          <Route path="/employee/progress" element={<EmployeeDashboard />} />
          
          {/* Shared Routes */}
          <Route path="/settings" element={<Settings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

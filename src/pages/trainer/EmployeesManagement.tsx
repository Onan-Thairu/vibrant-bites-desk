import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Plus, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mockEmployees = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    avatar: "",
    mealPlans: ["High-Protein Diet", "Muscle Gain Plan"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    avatar: "",
    mealPlans: ["Vegan Meal Plan"],
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@company.com",
    avatar: "",
    mealPlans: ["Low-Carb Diet", "Keto Plan"],
  },
];

export default function EmployeesManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Employees</h1>
            </div>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90"
              onClick={() => navigate("/trainer/employees/invite")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Invite
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="space-y-3">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-card border border-border rounded-lg p-4"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                    <Mail className="h-3 w-3" />
                    {employee.email}
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Assigned Meal Plans:</p>
                    <div className="flex flex-wrap gap-1">
                      {employee.mealPlans.length > 0 ? (
                        employee.mealPlans.map((plan, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-accent/20 text-accent-foreground"
                          >
                            {plan}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground italic">
                          No meal plans assigned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}

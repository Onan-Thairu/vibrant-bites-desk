import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const mockEmployees = [
  { id: "1", name: "John Doe", email: "john@company.com" },
  { id: "2", name: "Jane Smith", email: "jane@company.com" },
  { id: "3", name: "Bob Johnson", email: "bob@company.com" },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function CreateMealPlan() {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [startingDay, setStartingDay] = useState("Monday");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const handleCreate = () => {
    if (!planName.trim()) {
      toast.error("Please enter a meal plan name");
      return;
    }
    if (selectedEmployees.length === 0) {
      toast.error("Please assign at least one employee");
      return;
    }
    toast.success(`Meal plan created and assigned to ${selectedEmployees.length} employee(s)!`);
    navigate("/trainer/plans");
  };

  const toggleEmployee = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Create Meal Plan</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Plan Name */}
        <div className="space-y-2">
          <Label htmlFor="planName">Meal Plan Name</Label>
          <Input
            id="planName"
            placeholder="e.g., 7-Day Weight Loss Plan"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>

        {/* Starting Day */}
        <div className="space-y-2">
          <Label htmlFor="startingDay">Starting Day</Label>
          <Select value={startingDay} onValueChange={setStartingDay}>
            <SelectTrigger id="startingDay">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Add a brief description of this meal plan..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Days Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Meal Plan Days</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                style={{ boxShadow: "var(--shadow-card)" }}
                onClick={() => navigate(`/trainer/plans/create/day/${day}`)}
              >
                <div className="text-left">
                  <h3 className="font-semibold">Day {day}</h3>
                  <p className="text-sm text-muted-foreground">Configure meals for this day</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>

        {/* Nutritional Information */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Nutritional Information</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input id="calories" placeholder="(g)" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">Protein</Label>
              <Input id="protein" placeholder="(g)" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs</Label>
              <Input id="carbs" placeholder="(g)" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Fat</Label>
              <Input id="fat" placeholder="(g)" type="number" />
            </div>
          </div>
        </section>

        {/* Assign to Employees */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Assign to Employees</h2>
          <div className="space-y-3">
            {mockEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center space-x-3 bg-card border border-border rounded-lg p-4"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <Checkbox
                  id={`employee-${employee.id}`}
                  checked={selectedEmployees.includes(employee.id)}
                  onCheckedChange={() => toggleEmployee(employee.id)}
                />
                <label
                  htmlFor={`employee-${employee.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-sm text-muted-foreground">{employee.email}</div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Create Button */}
        <Button
          className="w-full bg-accent hover:bg-accent/90 h-12 text-base font-semibold"
          onClick={handleCreate}
        >
          Create Meal Plan
        </Button>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}

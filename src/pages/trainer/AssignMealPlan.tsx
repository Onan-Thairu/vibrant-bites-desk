import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";

const mockTrainees = [
  { id: "1", name: "John Doe", email: "john@company.com" },
  { id: "2", name: "Jane Smith", email: "jane@company.com" },
  { id: "3", name: "Bob Johnson", email: "bob@company.com" },
  { id: "4", name: "Alice Williams", email: "alice@company.com" },
  { id: "5", name: "Charlie Brown", email: "charlie@company.com" },
];

export default function AssignMealPlan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedTrainees, setSelectedTrainees] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTrainee = (traineeId: string) => {
    setSelectedTrainees((prev) =>
      prev.includes(traineeId)
        ? prev.filter((id) => id !== traineeId)
        : [...prev, traineeId]
    );
  };

  const handleAssign = () => {
    if (selectedTrainees.length === 0) {
      toast.error("Please select at least one trainee");
      return;
    }
    toast.success(`Meal plan assigned to ${selectedTrainees.length} trainee(s)!`);
    navigate("/trainer/plans");
  };

  const filteredTrainees = mockTrainees.filter(
    (trainee) =>
      trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Assign Meal Plan</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Select Trainees</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trainees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTrainees.map((trainee) => (
              <div
                key={trainee.id}
                className="flex items-center gap-3 p-3 border border-border rounded-lg"
              >
                <Checkbox
                  id={`trainee-${trainee.id}`}
                  checked={selectedTrainees.includes(trainee.id)}
                  onCheckedChange={() => toggleTrainee(trainee.id)}
                />
                <Label
                  htmlFor={`trainee-${trainee.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-medium">{trainee.name}</div>
                  <div className="text-sm text-muted-foreground">{trainee.email}</div>
                </Label>
              </div>
            ))}
          </div>

          {selectedTrainees.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Selected: {selectedTrainees.length} trainee(s)
              </Label>
              <div className="flex flex-wrap gap-2">
                {selectedTrainees.map((id) => {
                  const trainee = mockTrainees.find((t) => t.id === id);
                  return trainee ? (
                    <div key={id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {trainee.name}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </section>

        <Button className="w-full" onClick={handleAssign}>
          Assign to Selected Trainees
        </Button>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}

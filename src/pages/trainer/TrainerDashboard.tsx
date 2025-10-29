import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Utensils, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TrainerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => navigate("/trainer/plans/create")}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Create New Meal Plan</h3>
                <p className="text-sm text-muted-foreground">Design a custom nutrition plan</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => navigate("/trainer/invite")}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Invite Trainee</h3>
                <p className="text-sm text-muted-foreground">Add a new team member</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Recent Trainees Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Trainees</h2>
            <Button variant="outline" onClick={() => navigate("/trainer/trainees")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "1", name: "John Doe", plan: "Weight Loss Plan", completion: 85 },
              { id: "2", name: "Jane Smith", plan: "Muscle Gain Plan", completion: 72 },
              { id: "3", name: "Bob Johnson", plan: "Maintenance Plan", completion: 90 },
            ].map((trainee) => (
              <Card
                key={trainee.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate(`/trainer/trainees/${trainee.id}/progress`)}
              >
                <div className="space-y-2">
                  <h3 className="font-semibold">{trainee.name}</h3>
                  <p className="text-sm text-muted-foreground">{trainee.plan}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{trainee.completion}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${trainee.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}

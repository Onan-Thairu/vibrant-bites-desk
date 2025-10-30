import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Utensils, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-meals.jpg";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70 z-10" />
        <img
          src={heroImage}
          alt="Healthy meal prep"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            MealTer
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
            Personalized meal planning for workplace wellness
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => navigate("/trainee")}
            >
              Trainee Login
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => navigate("/trainer")}
            >
              Trainer Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Empowering Healthy Habits at Work
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 border-none text-center" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Meal Plans</h3>
            <p className="text-muted-foreground">
              Trainers create personalized nutrition plans tailored to each trainee's goals
            </p>
          </Card>

          <Card className="p-6 border-none text-center" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
            <p className="text-muted-foreground">
              Track trainee progress and adjust plans as needed with intuitive dashboards
            </p>
          </Card>

          <Card className="p-6 border-none text-center" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor engagement and adherence with simple analytics and insights
            </p>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose MealTer?
          </h2>
          <div className="space-y-6">
            {[
              "Complement trainee workouts with structured nutrition guidance",
              "Reduce time spent on manual meal planning and communication",
              "Improve trainee wellness and productivity",
              "Access plans anytime, anywhere with our Progressive Web App",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 MealTer. Supporting workplace wellness through better nutrition.</p>
        </div>
      </footer>
    </div>
  );
}

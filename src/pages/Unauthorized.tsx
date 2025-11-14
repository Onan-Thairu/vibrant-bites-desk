import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ShieldAlert } from "lucide-react";
import unauthorizedImage from "@/assets/unauthorized-illustration.jpg";

const Unauthorized = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("Unauthorized access attempt:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <img 
            src={unauthorizedImage} 
            alt="Access denied illustration" 
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldAlert className="h-8 w-8 text-destructive" />
          <h1 className="text-4xl font-bold text-foreground">Access Denied</h1>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          Only trainers can view meal plans
        </p>
        
        <Button asChild size="lg">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;

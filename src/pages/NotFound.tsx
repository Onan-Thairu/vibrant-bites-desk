import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, UtensilsCrossed } from "lucide-react";
import notFoundImage from "@/assets/404-illustration.jpg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <img 
            src={notFoundImage} 
            alt="Page not found illustration" 
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
          <h1 className="text-6xl font-bold text-foreground">404</h1>
        </div>
        
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          This Recipe Doesn't Exist!
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8">
          Looks like this page is not on our menu. The meal plan you're looking for might have been moved or doesn't exist.
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

export default NotFound;

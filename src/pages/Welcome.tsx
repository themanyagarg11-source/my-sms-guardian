import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Smartphone } from "lucide-react";
import myhelperLogo from "@/assets/myhelper-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center bg-gradient-card shadow-glow">
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <img 
              src={myhelperLogo} 
              alt="MyHelper Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">MyHelper</h1>
          <p className="text-muted-foreground text-lg">
            Your Offline SMS Personal Assistant
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-left">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm">Complete offline security</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <Smartphone className="w-5 h-5 text-primary" />
            <span className="text-sm">SMS-controlled remote access</span>
          </div>
        </div>

        <Button 
          onClick={() => navigate("/setup")}
          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground shadow-feature"
          size="lg"
        >
          Get Started
        </Button>
      </Card>
    </div>
  );
};

export default Welcome;
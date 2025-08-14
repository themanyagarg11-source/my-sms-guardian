import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, ArrowLeft } from "lucide-react";

const PasscodeSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");

  const handleSave = () => {
    if (passcode.length < 4) {
      toast({
        title: "Invalid Passcode",
        description: "Passcode must be at least 4 characters long",
        variant: "destructive"
      });
      return;
    }

    if (passcode !== confirmPasscode) {
      toast({
        title: "Passcode Mismatch",
        description: "Please make sure both passcodes match",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage for demo purposes
    localStorage.setItem("myhelper_passcode", passcode);
    
    toast({
      title: "Passcode Set Successfully",
      description: "Your secure passcode has been saved",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-gradient-card shadow-glow">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Set Your Secure Passcode</h1>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">
          All SMS commands must include this passcode for security
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="passcode">Passcode</Label>
            <Input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter secure passcode"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="confirm">Confirm Passcode</Label>
            <Input
              id="confirm"
              type="password"
              value={confirmPasscode}
              onChange={(e) => setConfirmPasscode(e.target.value)}
              placeholder="Confirm your passcode"
              className="mt-1"
            />
          </div>

          <div className="bg-muted p-3 rounded-lg text-sm">
            <strong>Example SMS format:</strong><br />
            <code>{passcode || "1234"} getcontact John</code>
          </div>
        </div>

        <Button 
          onClick={handleSave}
          className="w-full mt-6 bg-primary hover:bg-primary-dark text-primary-foreground"
          size="lg"
        >
          Save & Continue
        </Button>
      </Card>
    </div>
  );
};

export default PasscodeSetup;
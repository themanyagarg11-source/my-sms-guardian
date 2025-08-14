import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Volume2, ArrowLeft, VolumeX } from "lucide-react";

const RingerSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(true);
  
  const passcode = localStorage.getItem("myhelper_passcode") || "1234";

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Ringer control settings have been updated",
    });
  };

  const handleTest = () => {
    toast({
      title: "Ringer Test",
      description: `Command "${passcode} loud" would set ringer to loud mode`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Volume2 className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Ringer Control Settings</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Enable Ringer Control</h3>
                <p className="text-muted-foreground text-sm">
                  Allow SMS commands to change phone volume
                </p>
              </div>
              <Switch 
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Available Commands</h3>
            <div className="space-y-3">
              <div className="bg-muted p-4 rounded-lg flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-success" />
                <div>
                  <code className="text-primary">{passcode} loud</code>
                  <p className="text-sm text-muted-foreground">Set ringer to loud mode</p>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg flex items-center gap-3">
                <VolumeX className="w-5 h-5 text-warning" />
                <div>
                  <code className="text-primary">{passcode} silent</code>
                  <p className="text-sm text-muted-foreground">Set ringer to silent mode</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex gap-4">
              <Button 
                onClick={handleTest}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Volume2 className="w-4 h-4" />
                Test Loud Command
              </Button>
              <Button 
                onClick={() => toast({
                  title: "Silent Test",
                  description: `Command "${passcode} silent" would set ringer to silent`,
                })}
                variant="outline"
                className="flex-1 gap-2"
              >
                <VolumeX className="w-4 h-4" />
                Test Silent Command
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-success/10 border-success/20">
            <h3 className="text-lg font-semibold mb-2 text-success">Use Cases</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Find your phone when it's on silent</li>
              <li>• Ensure important calls are heard in emergencies</li>
              <li>• Remote volume control for elderly users</li>
            </ul>
          </Card>

          <Button 
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
            size="lg"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RingerSettings;
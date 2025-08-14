import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Lock, ArrowLeft, Shield, AlertTriangle } from "lucide-react";

const LockSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(true);
  const [deviceAdminGranted, setDeviceAdminGranted] = useState(false);
  
  const passcode = localStorage.getItem("myhelper_passcode") || "1234";

  const handleGrantDeviceAdmin = () => {
    // In a real app, this would request Device Admin permissions
    toast({
      title: "Device Admin Required",
      description: "In a real app, this would open Android's Device Admin settings",
    });
    setDeviceAdminGranted(true);
  };

  const handleTest = () => {
    if (!deviceAdminGranted) {
      toast({
        title: "Device Admin Required",
        description: "Please grant Device Admin permissions first",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Lock Test",
      description: `Command "${passcode} lock" would immediately lock the device`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Device lock settings have been updated",
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
          <Lock className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Lock Device Settings</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Enable Remote Lock</h3>
                <p className="text-muted-foreground text-sm">
                  Allow SMS commands to lock the device
                </p>
              </div>
              <Switch 
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Command Format</h3>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-primary">
                {passcode} lock
              </code>
            </div>
            <p className="text-muted-foreground text-sm">
              Immediately locks the device screen and requires PIN/pattern/biometric to unlock
            </p>
          </Card>

          <Card className="p-6 bg-warning/10 border-warning/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-warning" />
              <h3 className="text-lg font-semibold text-warning">Device Admin Permission</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Device Admin permissions are required to remotely lock the device. 
              This is a system-level security feature.
            </p>
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleGrantDeviceAdmin}
                variant={deviceAdminGranted ? "outline" : "default"}
                className="gap-2"
                disabled={deviceAdminGranted}
              >
                <Shield className="w-4 h-4" />
                {deviceAdminGranted ? "✓ Device Admin Granted" : "Grant Device Admin"}
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Test Lock Command</h3>
            <Button 
              onClick={handleTest}
              variant="outline"
              className="gap-2"
              disabled={!deviceAdminGranted}
            >
              <Lock className="w-4 h-4" />
              Test Lock Command
            </Button>
          </Card>

          <Card className="p-6 bg-destructive/10 border-destructive/20">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold text-destructive">Security Warning</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Only you should know the passcode</li>
              <li>• Test the unlock method before relying on remote lock</li>
              <li>• Use a secure lock screen (PIN, pattern, or biometric)</li>
              <li>• This feature can prevent unauthorized access to your device</li>
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

export default LockSettings;
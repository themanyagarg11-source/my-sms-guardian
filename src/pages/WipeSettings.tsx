import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Trash2, ArrowLeft, AlertTriangle, Shield, HardDrive } from "lucide-react";

const WipeSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [confirmationRequired, setConfirmationRequired] = useState(true);
  const [wipePhotos, setWipePhotos] = useState(false);
  const [factoryReset, setFactoryReset] = useState(true);
  
  const passcode = localStorage.getItem("myhelper_passcode") || "1234";

  const handleTest = () => {
    if (!enabled) {
      toast({
        title: "Feature Disabled",
        description: "Remote wipe is currently disabled",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Wipe Test Mode",
      description: "This is a test - no data would actually be deleted",
      variant: "destructive"
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Remote wipe settings have been updated",
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
          <Trash2 className="w-6 h-6 text-destructive" />
          <h1 className="text-2xl font-bold">Remote Wipe Settings</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-destructive/10 border-destructive/20">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h3 className="text-lg font-semibold text-destructive">DANGER ZONE</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              <strong>This feature will permanently delete data from your device.</strong> 
              Use only in extreme circumstances such as device theft or loss.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Enable Remote Wipe</h4>
                <p className="text-muted-foreground text-sm">
                  Allow SMS commands to delete device data
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
              <code className="text-destructive">
                {passcode} wipe
              </code>
            </div>
            <p className="text-muted-foreground text-sm">
              Initiates emergency data wipe procedure
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Wipe Options</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <label className="text-sm">Require confirmation SMS</label>
                </div>
                <Checkbox 
                  checked={confirmationRequired}
                  onCheckedChange={(checked) => setConfirmationRequired(checked === true)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  <label className="text-sm">Full factory reset</label>
                </div>
                <Checkbox 
                  checked={factoryReset}
                  onCheckedChange={(checked) => setFactoryReset(checked === true)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  <label className="text-sm">Include photos and media</label>
                </div>
                <Checkbox 
                  checked={wipePhotos}
                  onCheckedChange={(checked) => setWipePhotos(checked === true)}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Test Wipe Command</h3>
            <p className="text-muted-foreground text-sm mb-4">
              This will only simulate the wipe process - no actual data will be deleted
            </p>
            <Button 
              onClick={handleTest}
              variant="destructive"
              className="gap-2"
              disabled={!enabled}
            >
              <Trash2 className="w-4 h-4" />
              Test Wipe Command
            </Button>
          </Card>

          <Card className="p-6 bg-destructive/10 border-destructive/20">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold text-destructive">Critical Warnings</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>This action cannot be undone</strong></li>
              <li>• All personal data will be permanently lost</li>
              <li>• Ensure you have backups of important data</li>
              <li>• Test the feature thoroughly before relying on it</li>
              <li>• Only authorized users should know your passcode</li>
              <li>• Consider disabling this feature if not absolutely necessary</li>
            </ul>
          </Card>

          <Card className="p-6 bg-success/10 border-success/20">
            <h3 className="text-lg font-semibold mb-2 text-success">Use Cases</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Device theft or loss</li>
              <li>• Preventing unauthorized access to sensitive data</li>
              <li>• Corporate security compliance</li>
              <li>• Medical/legal confidentiality requirements</li>
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

export default WipeSettings;
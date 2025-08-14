import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { MapPin, ArrowLeft, Battery, Navigation } from "lucide-react";

const LocationSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(true);
  const [includeBattery, setIncludeBattery] = useState(true);
  const [includeAddress, setIncludeAddress] = useState(false);
  
  const passcode = localStorage.getItem("myhelper_passcode") || "1234";

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Location sharing settings have been updated",
    });
  };

  const handleTest = () => {
    const mockLat = "40.7128";
    const mockLng = "-74.0060";
    const mockBattery = includeBattery ? " | Battery: 76%" : "";
    const mockAddress = includeAddress ? " | Address: New York, NY" : "";
    
    toast({
      title: "Location Test",
      description: `Would send: "Location: https://maps.google.com/maps?q=${mockLat},${mockLng}${mockBattery}${mockAddress}"`,
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
          <MapPin className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Location Settings</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Allow Location Sharing</h3>
                <p className="text-muted-foreground text-sm">
                  Enable GPS location sharing via SMS
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
                {passcode} locate
              </code>
            </div>
            <p className="text-muted-foreground text-sm">
              Sends current GPS coordinates as a Google Maps link
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="battery"
                  checked={includeBattery}
                  onCheckedChange={(checked) => setIncludeBattery(checked === true)}
                />
                <label htmlFor="battery" className="text-sm flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  Include battery status in location SMS
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="address"
                  checked={includeAddress}
                  onCheckedChange={(checked) => setIncludeAddress(checked === true)}
                />
                <label htmlFor="address" className="text-sm flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Include approximate address
                </label>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Test Location</h3>
            <Button 
              onClick={handleTest}
              variant="outline"
              className="gap-2"
            >
              <MapPin className="w-4 h-4" />
              Test Location Command
            </Button>
          </Card>

          <Card className="p-6 bg-accent/10 border-accent/20">
            <h3 className="text-lg font-semibold mb-2 text-accent">Privacy Notice</h3>
            <p className="text-sm text-muted-foreground">
              Location data is only shared when the correct passcode is provided via SMS. 
              No location data is stored or transmitted to external servers.
            </p>
          </Card>

          <Card className="p-6 bg-success/10 border-success/20">
            <h3 className="text-lg font-semibold mb-2 text-success">Emergency Uses</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Find lost or stolen device</li>
              <li>• Emergency location sharing</li>
              <li>• Family safety and tracking</li>
              <li>• Medical emergency assistance</li>
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

export default LocationSettings;
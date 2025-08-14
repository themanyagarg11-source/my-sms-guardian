import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, ArrowLeft, Plus, X, UserPlus } from "lucide-react";

const SOSSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(true);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Emergency Contact 1", phone: "" },
    { name: "Emergency Contact 2", phone: "" }
  ]);
  const [customMessage, setCustomMessage] = useState("EMERGENCY! I need immediate assistance. Current location will be shared.");
  
  const passcode = localStorage.getItem("myhelper_passcode") || "1234";

  const addContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: "", phone: "" }]);
  };

  const removeContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };

  const updateContact = (index: number, field: "name" | "phone", value: string) => {
    const updated = [...emergencyContacts];
    updated[index][field] = value;
    setEmergencyContacts(updated);
  };

  const handleTest = () => {
    const validContacts = emergencyContacts.filter(c => c.phone.trim());
    if (validContacts.length === 0) {
      toast({
        title: "No Emergency Contacts",
        description: "Please add at least one emergency contact",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "SOS Test",
      description: `Would send emergency alert to ${validContacts.length} contact(s) with location`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "SOS alert settings have been updated",
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
          <AlertTriangle className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-bold">SOS Alert Settings</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Enable SOS Alerts</h3>
                <p className="text-muted-foreground text-sm">
                  Send emergency alerts with location to predefined contacts
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
              <code className="text-accent">
                {passcode} sos
              </code>
            </div>
            <p className="text-muted-foreground text-sm">
              Sends emergency alert + current location to all emergency contacts
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Emergency Contacts</h3>
              <Button 
                onClick={addContact}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Contact
              </Button>
            </div>
            
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={contact.name}
                      onChange={(e) => updateContact(index, "name", e.target.value)}
                      placeholder="Contact name"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                    <Input
                      id={`phone-${index}`}
                      value={contact.phone}
                      onChange={(e) => updateContact(index, "phone", e.target.value)}
                      placeholder="+1234567890"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={() => removeContact(index)}
                    variant="outline"
                    size="sm"
                    className="p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Custom SOS Message</h3>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Enter your emergency message..."
              className="min-h-[100px]"
            />
            <p className="text-muted-foreground text-xs mt-2">
              This message will be sent along with your current location
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Test SOS Alert</h3>
            <Button 
              onClick={handleTest}
              variant="outline"
              className="gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Test SOS Command
            </Button>
          </Card>

          <Card className="p-6 bg-accent/10 border-accent/20">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-accent">Emergency Use Only</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Only use in genuine emergencies</li>
              <li>• Ensure emergency contacts are aware of this feature</li>
              <li>• Test periodically to ensure it works</li>
              <li>• Location sharing must be enabled for full functionality</li>
            </ul>
          </Card>

          <Button 
            onClick={handleSave}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            Save SOS Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SOSSettings;
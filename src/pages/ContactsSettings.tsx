import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Phone, ArrowLeft, TestTube } from "lucide-react";

const ContactsSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(true);
  const [testCommand, setTestCommand] = useState("");
  
  const passcode = localStorage.getItem("myhelper_passcode") || "1234";

  const handleTest = () => {
    if (!testCommand.trim()) {
      toast({
        title: "Enter Test Command",
        description: "Please enter a contact name to test the lookup",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Contact Lookup Test",
      description: `Command "${passcode} getcontact ${testCommand}" would search for contact: ${testCommand}`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Contact lookup settings have been updated",
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
          <Phone className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Contacts Lookup Settings</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Enable Contact Lookup</h3>
                <p className="text-muted-foreground text-sm">
                  Allow SMS commands to search your phonebook
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
                {passcode} getcontact [Name]
              </code>
            </div>
            <p className="text-muted-foreground text-sm">
              Example: "{passcode} getcontact John" will search for John in your contacts and reply with the phone number.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Test Command</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="test">Contact Name</Label>
                <Input
                  id="test"
                  value={testCommand}
                  onChange={(e) => setTestCommand(e.target.value)}
                  placeholder="Enter contact name to test"
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleTest}
                variant="outline"
                className="gap-2"
              >
                <TestTube className="w-4 h-4" />
                Test Lookup
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-accent/10 border-accent/20">
            <h3 className="text-lg font-semibold mb-2 text-accent">Security Note</h3>
            <p className="text-sm text-muted-foreground">
              Contact information will only be shared via SMS when the correct passcode is provided. 
              Ensure your passcode is secure and not easily guessable.
            </p>
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

export default ContactsSettings;
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  HelpCircle, 
  Phone, 
  Volume2, 
  MapPin, 
  Lock, 
  AlertTriangle, 
  Trash2, 
  Mic,
  Download,
  Share
} from "lucide-react";

const Help = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const passcode = localStorage.getItem("myhelper_passcode") || "1234";

  const commands = [
    {
      icon: Phone,
      command: `${passcode} getcontact [Name]`,
      description: "Find contact number by name",
      example: `${passcode} getcontact John`,
      category: "Contacts"
    },
    {
      icon: Volume2,
      command: `${passcode} loud`,
      description: "Set ringer to loud mode",
      example: `${passcode} loud`,
      category: "Audio"
    },
    {
      icon: Volume2,
      command: `${passcode} silent`,
      description: "Set ringer to silent mode",
      example: `${passcode} silent`,
      category: "Audio"
    },
    {
      icon: MapPin,
      command: `${passcode} locate`,
      description: "Send current GPS location",
      example: `${passcode} locate`,
      category: "Location"
    },
    {
      icon: Lock,
      command: `${passcode} lock`,
      description: "Lock device immediately",
      example: `${passcode} lock`,
      category: "Security"
    },
    {
      icon: AlertTriangle,
      command: `${passcode} sos`,
      description: "Send emergency alert with location",
      example: `${passcode} sos`,
      category: "Emergency"
    },
    {
      icon: Trash2,
      command: `${passcode} wipe`,
      description: "Emergency data wipe",
      example: `${passcode} wipe`,
      category: "Security"
    }
  ];

  const handleExportPDF = () => {
    toast({
      title: "Export Commands",
      description: "In a real app, this would generate a PDF of all commands",
    });
  };

  const handleShareSMS = () => {
    toast({
      title: "Share via SMS",
      description: "In a real app, this would share the command list via SMS",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <HelpCircle className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Help & Command Reference</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card">
            <h2 className="text-xl font-semibold mb-4">How MyHelper Works</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">SMS Commands</h3>
                <p className="text-muted-foreground text-sm">
                  Send SMS commands to your phone number to remotely control various functions. 
                  All commands must start with your secure passcode.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Offline Operation</h3>
                <p className="text-muted-foreground text-sm">
                  MyHelper works completely offline - no internet connection required. 
                  Perfect for emergency situations.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 mb-6">
            <Button 
              onClick={handleExportPDF}
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export as PDF
            </Button>
            <Button 
              onClick={handleShareSMS}
              variant="outline"
              className="gap-2"
            >
              <Share className="w-4 h-4" />
              Share via SMS
            </Button>
          </div>

          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">All SMS Commands</h2>
            {commands.map((cmd, index) => (
              <Card key={index} className="p-4 bg-gradient-card hover:shadow-card transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-secondary">
                    <cmd.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {cmd.category}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm text-primary">
                        {cmd.command}
                      </code>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {cmd.description}
                    </p>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Example: </span>
                      <code className="text-success">{cmd.example}</code>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-warning/10 border-warning/20">
            <h3 className="text-lg font-semibold mb-2 text-warning">Security Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keep your passcode secure and don't share it</li>
              <li>• Test commands periodically to ensure they work</li>
              <li>• Make sure trusted contacts know how to use emergency features</li>
              <li>• Back up important data before enabling remote wipe</li>
            </ul>
          </Card>

          <Card className="p-6 bg-accent/10 border-accent/20">
            <h3 className="text-lg font-semibold mb-2 text-accent">Troubleshooting</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Commands not working?</strong> Check if SMS permissions are granted and the passcode is correct.</p>
              <p><strong>Location not sharing?</strong> Ensure GPS and location permissions are enabled.</p>
              <p><strong>Device not locking?</strong> Make sure Device Admin permissions are granted.</p>
            </div>
          </Card>

          <Card className="p-6 bg-success/10 border-success/20">
            <h3 className="text-lg font-semibold mb-2 text-success">Emergency Contacts</h3>
            <p className="text-sm text-muted-foreground">
              Share this command reference with trusted family members or friends who might need to 
              help you in an emergency. Make sure they know your passcode and understand how to use the SOS feature.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
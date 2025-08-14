import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Volume2, 
  MapPin, 
  Lock, 
  AlertTriangle, 
  Trash2, 
  Mic,
  HelpCircle,
  ArrowLeft
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Phone,
      title: "Contacts Lookup",
      description: "Find contact numbers by name",
      path: "/contacts",
      color: "text-primary"
    },
    {
      icon: Volume2,
      title: "Change Ringer",
      description: "Control phone volume remotely",
      path: "/ringer",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Send Location",
      description: "Share GPS coordinates",
      path: "/location",
      color: "text-success"
    },
    {
      icon: Lock,
      title: "Lock Device",
      description: "Secure your phone instantly",
      path: "/lock",
      color: "text-warning"
    },
    {
      icon: AlertTriangle,
      title: "SOS Alert",
      description: "Emergency alert system",
      path: "/sos",
      color: "text-accent"
    },
    {
      icon: Trash2,
      title: "Remote Wipe",
      description: "Emergency data protection",
      path: "/wipe",
      color: "text-destructive"
    },
    {
      icon: Mic,
      title: "Voice-to-SMS",
      description: "Accessibility features",
      path: "/accessibility",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/setup")}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-primary">MyHelper Dashboard</h1>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate("/help")}
            className="gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-feature transition-all duration-300 cursor-pointer bg-gradient-card border-0"
              onClick={() => navigate(feature.path)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full bg-secondary ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 bg-gradient-card border-primary/20">
          <h3 className="text-lg font-semibold mb-3 text-primary">Quick Status</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Passcode:</span>
              <span className="ml-2 text-success">✓ Set</span>
            </div>
            <div>
              <span className="text-muted-foreground">SMS Access:</span>
              <span className="ml-2 text-success">✓ Ready</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
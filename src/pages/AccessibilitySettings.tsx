import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mic, ArrowLeft, Volume2, Eye, Heart } from "lucide-react";

const AccessibilitySettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [triggerPhrase, setTriggerPhrase] = useState("Hey MyHelper");
  const [largeFontEnabled, setLargeFontEnabled] = useState(false);
  const [highContrastEnabled, setHighContrastEnabled] = useState(false);
  const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(true);
  
  const handleTest = () => {
    toast({
      title: "Voice Test",
      description: `Voice trigger "${triggerPhrase}" would activate SMS command mode`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Accessibility settings have been updated",
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
          <Mic className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Accessibility Settings</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Voice-to-SMS Trigger
                </h3>
                <p className="text-muted-foreground text-sm">
                  Enable voice commands for SMS assistance
                </p>
              </div>
              <Switch 
                checked={voiceEnabled}
                onCheckedChange={setVoiceEnabled}
              />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Voice Trigger Configuration</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="trigger">Trigger Phrase</Label>
                <Input
                  id="trigger"
                  value={triggerPhrase}
                  onChange={(e) => setTriggerPhrase(e.target.value)}
                  placeholder="Enter voice trigger phrase"
                  className="mt-1"
                  disabled={!voiceEnabled}
                />
                <p className="text-muted-foreground text-xs mt-1">
                  Say this phrase to activate voice command mode
                </p>
              </div>
              
              <Button 
                onClick={handleTest}
                variant="outline"
                className="gap-2"
                disabled={!voiceEnabled}
              >
                <Mic className="w-4 h-4" />
                Test Voice Trigger
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Visual Accessibility
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Large Font Mode</h4>
                  <p className="text-muted-foreground text-sm">
                    Increase text size for better readability
                  </p>
                </div>
                <Switch 
                  checked={largeFontEnabled}
                  onCheckedChange={setLargeFontEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">High Contrast Mode</h4>
                  <p className="text-muted-foreground text-sm">
                    Enhanced contrast for visual impairments
                  </p>
                </div>
                <Switch 
                  checked={highContrastEnabled}
                  onCheckedChange={setHighContrastEnabled}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Audio Accessibility
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Audio Feedback</h4>
                <p className="text-muted-foreground text-sm">
                  Spoken confirmations for actions
                </p>
              </div>
              <Switch 
                checked={audioFeedbackEnabled}
                onCheckedChange={setAudioFeedbackEnabled}
              />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">How Voice-to-SMS Works</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                <p>Say your trigger phrase: "{triggerPhrase}"</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                <p>Speak your SMS command (e.g., "Get contact John")</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">3</span>
                <p>MyHelper converts speech to SMS and sends the command</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-success/10 border-success/20">
            <h3 className="text-lg font-semibold mb-2 text-success flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Designed for Everyone
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Elderly users who prefer voice commands</li>
              <li>• Visually impaired users needing audio assistance</li>
              <li>• Users with mobility limitations</li>
              <li>• Emergency situations where typing is difficult</li>
            </ul>
          </Card>

          <Button 
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
            size="lg"
          >
            Save Accessibility Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
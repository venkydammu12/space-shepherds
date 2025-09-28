import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
  robotStatus?: string;
}

const VoiceAssistant = ({ onCommand, robotStatus = "standby" }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          console.log('Command received:', finalTranscript);
          onCommand?.(finalTranscript.toLowerCase());
          handleCommand(finalTranscript.toLowerCase());
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Voice Recognition Error",
          description: "Unable to process voice command. Please try again.",
          variant: "destructive"
        });
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onCommand, toast]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      // Find a robotic-sounding voice if available
      const voices = speechSynthesis.getVoices();
      const robotVoice = voices.find(voice => 
        voice.name.includes('Alex') || 
        voice.name.includes('Daniel') || 
        voice.name.includes('Fred')
      );
      
      if (robotVoice) {
        utterance.voice = robotVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const handleCommand = (command: string) => {
    const responses: { [key: string]: string } = {
      'status': `Robot status: ${robotStatus}. All systems operational.`,
      'hello': 'Greetings, mission control. Robot SW-07 reporting for duty.',
      'collect debris': 'Affirmative. Initiating debris collection sequence. Moving to target coordinates.',
      'return home': 'Understood. Returning to motherstation for docking and maintenance.',
      'scan area': 'Beginning orbital scan. LiDAR and radar sensors active. Analyzing debris field.',
      'mission report': 'Mission progress: 247 debris objects collected. Success rate: 99.7%. Energy level optimal.',
      'emergency': 'Emergency protocol activated. All robots returning to safe positions immediately.',
      'deploy robots': 'Deploying swarm robots to designated sectors. Formation Alpha initiated.',
    };

    // Find matching command
    const matchedCommand = Object.keys(responses).find(key => 
      command.includes(key) || key.includes(command.split(' ')[0])
    );

    if (matchedCommand) {
      speak(responses[matchedCommand]);
    } else if (command.includes('debris') || command.includes('collect')) {
      speak('Debris detected. Moving to intercept. Collection arms deploying.');
    } else if (command.includes('robot') || command.includes('status')) {
      speak('All systems operational. Robot swarm ready for deployment.');
    } else {
      speak('Command received. Processing request.');
    }
  };

  const toggleListening = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in this browser.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Auto-announce robot status changes
  useEffect(() => {
    if (robotStatus === "collecting") {
      speak("Debris collection in progress. Sensors locked on target.");
    } else if (robotStatus === "returning") {
      speak("Mission complete. Returning to motherstation.");
    } else if (robotStatus === "docked") {
      speak("Docking successful. Debris transferred. Standing by for next mission.");
    }
  }, [robotStatus]);

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary">ARIA Voice Control</h3>
        <div className="flex gap-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={toggleListening}
            className={isListening ? "bg-primary animate-pulse-glow" : ""}
            disabled={!isSupported}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={stopSpeaking}
            disabled={!isSpeaking}
          >
            {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Status: {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready"}</p>
        <div className="text-xs">
          <p>Try commands: "status", "collect debris", "scan area", "mission report"</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
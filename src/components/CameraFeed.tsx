import { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CameraFeed = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if camera access is supported
    setIsSupported('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices);
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setStream(mediaStream);
      setIsActive(true);
      
      toast({
        title: "Robot Vision Active",
        description: "Camera feed established. Robot eyes online.",
      });
    } catch (error) {
      console.error('Camera access error:', error);
      toast({
        title: "Camera Access Denied",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsActive(false);
    
    toast({
      title: "Robot Vision Offline",
      description: "Camera feed disconnected.",
    });
  };

  const toggleCamera = () => {
    if (isActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-accent">Robot Vision Feed</h3>
        <Button
          variant={isActive ? "destructive" : "default"}
          size="sm"
          onClick={toggleCamera}
          disabled={!isSupported}
          className={isActive ? "" : "bg-accent hover:bg-accent/90"}
        >
          {isActive ? (
            <>
              <Square className="w-4 h-4 mr-2" />
              Stop Feed
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Feed
            </>
          )}
        </Button>
      </div>

      <div className="relative aspect-video bg-card/50 rounded-lg overflow-hidden">
        {isActive ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            {/* Robot HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary rounded-full opacity-60">
                  <div className="w-full h-full border-2 border-accent rounded-full animate-pulse-glow" />
                </div>
              </div>
              
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary opacity-80" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary opacity-80" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary opacity-80" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary opacity-80" />
              
              {/* Status indicators */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 glass-card px-3 py-1 rounded">
                <div className="text-xs text-primary font-mono">ROBOT SW-07 | ACTIVE</div>
              </div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card px-3 py-1 rounded">
                <div className="text-xs text-accent font-mono">SCANNING FOR DEBRIS</div>
              </div>

              {/* Scan lines */}
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {isSupported 
                  ? "Click 'Start Feed' to activate robot vision" 
                  : "Camera not supported in this environment"
                }
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="glass-card p-3 rounded-lg">
          <div className="text-xs text-muted-foreground">Resolution</div>
          <div className="text-sm font-bold text-primary">640x480</div>
        </div>
        <div className="glass-card p-3 rounded-lg">
          <div className="text-xs text-muted-foreground">Frame Rate</div>
          <div className="text-sm font-bold text-accent">30 FPS</div>
        </div>
        <div className="glass-card p-3 rounded-lg">
          <div className="text-xs text-muted-foreground">Mode</div>
          <div className="text-sm font-bold text-primary">SCAN</div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
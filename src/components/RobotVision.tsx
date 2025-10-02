import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const RobotVision = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsSupported('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices);
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
      setIsActive(true);
      
      toast({
        title: "Camera Activated",
        description: "Robot vision system online",
      });
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      toast({
        title: "Camera Deactivated",
        description: "Robot vision system offline",
      });
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-black via-blue-950/20 to-black rounded-3xl border border-cyan-500/30 overflow-hidden">
      {/* Video Feed */}
      {isActive ? (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Blue Holographic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 pointer-events-none" />
          
          {/* Scan Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)] animate-[scan_8s_linear_infinite]" />
          </div>
          
          {/* HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner Brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
            
            {/* Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 border-2 border-cyan-400 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.6)]">
                <div className="absolute top-1/2 left-1/2 w-12 h-[2px] bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                <div className="absolute top-1/2 left-1/2 w-[2px] h-12 bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
              </div>
            </div>
            
            {/* Status Info */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/50">
              <div className="text-cyan-400 text-sm font-bold tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.8)]" />
                ROBOT VISION ACTIVE
              </div>
            </div>
            
            {/* Data Readouts */}
            <div className="absolute bottom-8 left-8 space-y-2">
              <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
                <div className="text-cyan-400 text-xs font-mono">RES: 1920x1080</div>
              </div>
              <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
                <div className="text-cyan-400 text-xs font-mono">FPS: 60</div>
              </div>
              <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
                <div className="text-cyan-400 text-xs font-mono">MODE: ENV SCAN</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border-2 border-cyan-500/30">
            <CameraOff className="w-16 h-16 text-cyan-400/50" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-cyan-400">Robot Vision Offline</h3>
            <p className="text-cyan-500/60">Activate camera to begin environmental scanning</p>
          </div>
        </div>
      )}
      
      {/* Control Button */}
      <div className="absolute bottom-8 right-8">
        <Button
          onClick={isActive ? stopCamera : startCamera}
          disabled={!isSupported}
          className={`${
            isActive
              ? 'bg-red-500/20 border-red-500 hover:bg-red-500/40 text-red-300'
              : 'bg-cyan-500/20 border-cyan-500 hover:bg-cyan-500/40 text-cyan-300'
          } border rounded-full px-6 py-6 shadow-[0_0_20px_rgba(0,255,255,0.3)]`}
        >
          {isActive ? (
            <>
              <CameraOff className="w-5 h-5 mr-2" />
              Deactivate
            </>
          ) : (
            <>
              <Camera className="w-5 h-5 mr-2" />
              Activate Vision
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default RobotVision;
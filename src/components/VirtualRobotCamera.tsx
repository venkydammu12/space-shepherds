import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { Button } from "./ui/button";

export default function VirtualRobotCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStatus, setCameraStatus] = useState<'initializing' | 'active' | 'blocked'>('initializing');
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        setCameraStatus('initializing');
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false,
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          
          await videoRef.current.play().catch(err => {
            console.log("Auto-play prevented:", err);
          });
          
          videoRef.current.onloadeddata = () => {
            setCameraStatus('active');
          };
        }
      } catch (error) {
        console.error("Camera Error:", error);
        setCameraStatus('blocked');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const link = document.createElement('a');
        link.download = `robot-capture-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background px-4 py-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Virtual Robot Eye Vision
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch through your robot's eye as it connects to your device camera in real-time
          </p>
        </div>

        {/* Camera Container */}
        <div className="relative w-full aspect-[21/9] max-w-5xl mx-auto">
          <div className="absolute inset-0 glass-card border-2 border-primary/30 rounded-lg overflow-hidden shadow-2xl">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

            {/* Video Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />

            {/* Scan Line Animation */}
            <div className="scan-line" />

            {/* Status Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30">
              {cameraStatus === 'initializing' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-sm text-yellow-500">Connecting to Camera...</span>
                </>
              )}
              {cameraStatus === 'active' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-500">Camera Connected</span>
                </>
              )}
              {cameraStatus === 'blocked' && (
                <>
                  <CameraOff className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Camera Access Blocked</span>
                </>
              )}
            </div>

            {/* Camera Blocked Message */}
            {cameraStatus === 'blocked' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="text-center space-y-4 p-6">
                  <CameraOff className="w-16 h-16 mx-auto text-red-500" />
                  <h3 className="text-xl font-semibold text-white">Camera Access Required</h3>
                  <p className="text-muted-foreground max-w-md">
                    Please allow camera access in your browser settings to use this feature
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Capture Button */}
        {cameraStatus === 'active' && (
          <div className="flex justify-center">
            <Button
              onClick={captureFrame}
              size="lg"
              className="gap-2"
            >
              <Camera className="w-5 h-5" />
              Capture Frame
            </Button>
          </div>
        )}

        {/* Hidden Canvas for Capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
  );
}

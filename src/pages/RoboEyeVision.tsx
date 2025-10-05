import { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const RoboEyeVision = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraStatus, setCameraStatus] = useState<'initializing' | 'active' | 'blocked'>('initializing');
  const [zoom, setZoom] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          // Explicitly play the video
          try {
            await videoRef.current.play();
          } catch (playError) {
            console.error('Video play failed:', playError);
          }
        }

        setStream(mediaStream);
        setCameraStatus('active');
        toast.success('Camera activated successfully');
      } catch (error) {
        console.error('Camera access denied:', error);
        setCameraStatus('blocked');
        toast.error('Camera access denied. Please enable camera permissions.');
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 1));
  };

  const handleMaximize = () => {
    setDimensions({ width: window.innerWidth * 0.9, height: window.innerHeight * 0.8 });
  };

  const handleReset = () => {
    setDimensions({ width: 800, height: 600 });
    setZoom(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Title */}
      <div className="text-center mb-8 z-10 animate-fade-in">
        <h1 
          className="text-5xl md:text-6xl font-bold mb-4 tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #10b981, #34d399, #6ee7b7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(16, 185, 129, 0.5)',
          }}
        >
          🤖 Robo Eye Live Vision
        </h1>
        <p className="text-green-400/80 text-lg tracking-wide">
          Real-time Environmental Monitoring System
        </p>
      </div>

      {/* Camera Container */}
      <div
        ref={containerRef}
        className="relative z-10 transition-all duration-500 ease-out animate-scale-in"
        style={{
          width: Math.min(dimensions.width, window.innerWidth - 32),
          height: Math.min(dimensions.height, window.innerHeight - 200),
        }}
      >
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
            boxShadow: '0 0 60px rgba(16, 185, 129, 0.4), 0 0 100px rgba(16, 185, 129, 0.2), inset 0 0 40px rgba(16, 185, 129, 0.05)',
            border: '2px solid rgba(16, 185, 129, 0.5)',
          }}
        >
          {/* Camera Feed */}
          {cameraStatus === 'active' && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transition-transform duration-300"
              style={{
                transform: `scale(${zoom})`,
              }}
            />
          )}

          {/* Initializing State */}
          {cameraStatus === 'initializing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <Camera className="w-20 h-20 text-green-400 animate-pulse mb-4" />
              <div className="text-green-400 text-2xl font-bold tracking-wider animate-pulse">
                Initializing camera...
              </div>
              <div className="mt-4 flex gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-100" />
                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}

          {/* Blocked State */}
          {cameraStatus === 'blocked' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90">
              <CameraOff className="w-20 h-20 text-red-500 animate-pulse mb-4" />
              <div
                className="text-red-500 text-3xl font-bold tracking-wider mb-4"
                style={{
                  textShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
                }}
              >
                ⚠️ CAMERA ACCESS DENIED
              </div>
              <div className="text-red-400/80 text-center px-8 max-w-md">
                Please enable camera permissions in your browser settings to use Robo Eye Vision
              </div>
            </div>
          )}

          {/* Status Badge */}
          {cameraStatus === 'active' && (
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-500/50 animate-fade-in">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  style={{
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
                  }}
                />
                <span className="text-green-400 text-sm font-bold tracking-wider">
                  ✅ CAMERA ACTIVE
                </span>
              </div>
            </div>
          )}

          {/* Info Badge */}
          {cameraStatus === 'active' && (
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-500/50 animate-fade-in">
              <span className="text-green-400 text-xs font-mono">
                ZOOM: {(zoom * 100).toFixed(0)}%
              </span>
            </div>
          )}

          {/* Corner Decorations */}
          {cameraStatus === 'active' && (
            <>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-400/60" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400/60" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400/60" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400/60" />
            </>
          )}

          {/* Scan Line Effect */}
          {cameraStatus === 'active' && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)',
                animation: 'scan 3s linear infinite',
              }}
            />
          )}
        </div>
      </div>

      {/* Control Panel */}
      {cameraStatus === 'active' && (
        <div className="mt-6 flex gap-3 z-10 animate-fade-in">
          <Button
            onClick={handleZoomIn}
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/50"
          >
            <ZoomIn className="w-4 h-4 mr-2" />
            Zoom In
          </Button>
          <Button
            onClick={handleZoomOut}
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/50"
          >
            <ZoomOut className="w-4 h-4 mr-2" />
            Zoom Out
          </Button>
          <Button
            onClick={handleMaximize}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/50"
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            Maximize
          </Button>
          <Button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Reset
          </Button>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
};

export default RoboEyeVision;

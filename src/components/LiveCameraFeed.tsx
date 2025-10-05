import { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';

const LiveCameraFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraBlocked, setCameraBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 1280 }
          }
        });

        if (videoRef.current) {
          const videoElement = videoRef.current;
          videoElement.srcObject = mediaStream;
          
          // Wait for metadata to load before playing
          videoElement.onloadedmetadata = async () => {
            try {
              // Force play with proper promise handling
              const playPromise = videoElement.play();
              if (playPromise !== undefined) {
                await playPromise;
                console.log('Camera feed started successfully');
              }
            } catch (playError) {
              console.error('Video play failed:', playError);
            }
          };
        }

        setStream(mediaStream);
        setCameraBlocked(false);
        setIsLoading(false);
      } catch (error) {
        console.log('Camera access denied:', error);
        setCameraBlocked(true);
        setIsLoading(false);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <section className="flex justify-center items-center min-h-screen bg-black px-4 py-8">
      <div className="relative w-full max-w-[600px] aspect-square">
        <div
          className="absolute inset-0 rounded-2xl border-4 border-cyan-400"
          style={{
            boxShadow: '0 0 30px rgba(0, 170, 255, 0.6), 0 0 60px rgba(0, 170, 255, 0.3), inset 0 0 20px rgba(0, 170, 255, 0.1)'
          }}
        >
          {!cameraBlocked && !isLoading ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-black via-blue-950/30 to-black rounded-xl">
              {isLoading ? (
                <>
                  <Camera className="w-20 h-20 text-cyan-400 animate-pulse" />
                  <div className="text-cyan-400 text-2xl font-bold tracking-wider animate-pulse">
                    INITIALIZING CAMERA...
                  </div>
                </>
              ) : (
                <>
                  <CameraOff className="w-20 h-20 text-cyan-400 animate-pulse" />
                  <div
                    className="text-cyan-400 text-3xl font-bold tracking-wider"
                    style={{
                      textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)'
                    }}
                  >
                    CAMERA OFFLINE
                  </div>
                  <div className="text-cyan-300/60 text-sm text-center px-8">
                    Enable camera permissions to view live feed
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {!cameraBlocked && !isLoading && (
          <>
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.8)]" />
                <span className="text-cyan-400 text-sm font-bold tracking-wider">LIVE</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/50">
              <span className="text-cyan-400 text-xs font-mono">ROBO EYE ACTIVE</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LiveCameraFeed;

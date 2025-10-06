import { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Play, Square } from 'lucide-react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { Button } from './ui/button';

const AIWasteDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraStatus, setCameraStatus] = useState<'initializing' | 'active' | 'blocked'>('initializing');
  const [detectionActive, setDetectionActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Initializing AI...');
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const detectionIntervalRef = useRef<number | null>(null);

  // Load TensorFlow model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setStatusMessage('Loading AI Model...');
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setStatusMessage('AI Ready ✅');
      } catch (error) {
        console.error('Error loading model:', error);
        setStatusMessage('❌ AI Model Failed to Load');
      }
    };
    loadModel();
  }, []);

  // Auto-start camera on mount
  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 420 },
            height: { ideal: 320 }
          }
        });

        if (videoRef.current) {
          const videoElement = videoRef.current;
          videoElement.srcObject = mediaStream;
          
          videoElement.onloadedmetadata = async () => {
            try {
              const playPromise = videoElement.play();
              if (playPromise !== undefined) {
                await playPromise;
                setStatusMessage('Camera Connected ✅');
                setCameraStatus('active');
              }
            } catch (playError) {
              console.error('Video play failed:', playError);
            }
          };
        }

        setStream(mediaStream);
      } catch (error) {
        console.error('Camera access denied:', error);
        setCameraStatus('blocked');
        setStatusMessage('❌ Camera Access Denied');
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  // Voice synthesis function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start object detection
  const startDetection = () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    setDetectionActive(true);
    setStatusMessage('Detecting objects...');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Clear any existing interval
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }

    detectionIntervalRef.current = window.setInterval(async () => {
      try {
        const predictions = await model.detect(video);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw predictions
        predictions.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox;
          
          // Draw bounding box
          ctx.strokeStyle = '#00ffb7';
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, width, height);

          // Draw label background
          ctx.fillStyle = '#00ffb7';
          const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
          const textWidth = ctx.measureText(text).width;
          ctx.fillRect(x, y > 20 ? y - 20 : y, textWidth + 10, 20);

          // Draw label text
          ctx.fillStyle = '#000';
          ctx.font = '14px "Poppins", sans-serif';
          ctx.fillText(text, x + 5, y > 20 ? y - 5 : y + 15);

          // Voice feedback for high-confidence detections
          if (prediction.score > 0.6) {
            speak(`Detected ${prediction.class}`);
          }
        });
      } catch (error) {
        console.error('Detection error:', error);
      }
    }, 1500);
  };

  // Stop detection
  const stopDetection = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setDetectionActive(false);
    setStatusMessage('Detection Stopped');
    
    // Clear canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#00ffb7] mb-3">
          🤖 AI Robot Eye – Waste Detection
        </h1>
        <p className="max-w-2xl text-gray-300 text-sm md:text-base">
          Watch through your robot's eye as it detects waste materials like{' '}
          <strong className="text-[#00ffb7]">plastic</strong>,{' '}
          <strong className="text-[#00ffb7]">metal</strong>,{' '}
          <strong className="text-[#00ffb7]">paper</strong>, and more in real-time!
        </p>
      </div>

      <div className="relative w-full max-w-[420px] aspect-[420/320]">
        <div
          className="absolute inset-0 rounded-xl border-4 border-[#00ffb7] overflow-hidden bg-black"
          style={{
            boxShadow: '0 0 30px rgba(0,255,183,0.3), 0 0 60px rgba(0,255,183,0.2)'
          }}
        >
          {cameraStatus === 'active' ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas
                ref={canvasRef}
                width={420}
                height={320}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-black via-emerald-950/30 to-black">
              {cameraStatus === 'initializing' ? (
                <>
                  <Camera className="w-16 h-16 text-[#00ffb7] animate-pulse" />
                  <div className="text-[#00ffb7] text-xl font-bold tracking-wider animate-pulse">
                    INITIALIZING CAMERA...
                  </div>
                </>
              ) : (
                <>
                  <CameraOff className="w-16 h-16 text-[#00ffb7] animate-pulse" />
                  <div className="text-[#00ffb7] text-2xl font-bold tracking-wider">
                    CAMERA OFFLINE
                  </div>
                  <div className="text-emerald-300/60 text-sm text-center px-8">
                    Enable camera permissions to start detection
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#00ffb7]/50">
          <span className="text-[#00ffb7] text-sm font-mono">{statusMessage}</span>
        </div>

        {/* Detection Status */}
        {detectionActive && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-red-500/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
              <span className="text-red-400 text-xs font-bold tracking-wider">DETECTING</span>
            </div>
          </div>
        )}
      </div>

      {/* Control Button */}
      {cameraStatus === 'active' && model && (
        <Button
          onClick={detectionActive ? stopDetection : startDetection}
          className="mt-6 bg-[#00ffb7] hover:bg-[#00dd9f] text-black font-bold px-8 py-3 rounded-lg text-base shadow-lg transition-all duration-300 hover:scale-105"
          style={{
            boxShadow: '0 4px 20px rgba(0,255,183,0.4)'
          }}
        >
          {detectionActive ? (
            <>
              <Square className="w-5 h-5 mr-2" />
              Stop Detection
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              🚀 Start Detection
            </>
          )}
        </Button>
      )}

      {/* Instructions */}
      <div className="mt-8 max-w-md text-center">
        <p className="text-gray-400 text-xs md:text-sm">
          Point your camera at objects to detect waste materials. The AI will identify and announce detected items with voice feedback.
        </p>
      </div>
    </section>
  );
};

export default AIWasteDetector;

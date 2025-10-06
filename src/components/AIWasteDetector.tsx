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

  // Auto-start camera on mount with fallback
  useEffect(() => {
    const initCamera = async () => {
      try {
        setStatusMessage('Connecting to camera...');
        let mediaStream: MediaStream | null = null;

        // Try back camera first (environment)
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: 'environment' },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          });
        } catch (backCameraError) {
          // Fallback to front camera if back camera fails
          console.log('Back camera failed, trying front camera:', backCameraError);
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          });
        }

        if (videoRef.current && mediaStream) {
          const videoElement = videoRef.current;
          videoElement.srcObject = mediaStream;

          // Force immediate play
          videoElement.onloadedmetadata = async () => {
            try {
              await videoElement.play();
              console.log('Camera feed started successfully');
              setStatusMessage('Camera Connected ✅');
              setCameraStatus('active');
              setStream(mediaStream);
            } catch (playError) {
              console.error('Play error:', playError);
              setStatusMessage('❌ Failed to start camera');
            }
          };

          // Ensure video element is visible
          videoElement.style.display = 'block';
          videoElement.style.visibility = 'visible';
        }
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

  // Voice synthesis function with throttle
  const lastSpokenRef = useRef<Map<string, number>>(new Map());
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const now = Date.now();
      const lastSpoken = lastSpokenRef.current.get(text) || 0;

      // Only speak if not spoken in last 5 seconds
      if (now - lastSpoken > 5000) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
        lastSpokenRef.current.set(text, now);
      }
    }
  };

  // Start object detection
  const startDetection = () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    setDetectionActive(true);
    setStatusMessage('AI Detection Active ✅');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Match canvas dimensions to video
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

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

          // Scale coordinates to canvas size
          const scaleX = canvas.width / video.videoWidth;
          const scaleY = canvas.height / video.videoHeight;

          const scaledX = x * scaleX;
          const scaledY = y * scaleY;
          const scaledWidth = width * scaleX;
          const scaledHeight = height * scaleY;

          // Draw bounding box with green glow
          ctx.strokeStyle = '#00FF88';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#00FF88';
          ctx.shadowBlur = 10;
          ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
          ctx.shadowBlur = 0;

          // Draw label background
          const text = `${prediction.class} ${Math.round(prediction.score * 100)}%`;
          ctx.font = 'bold 16px "Inter", sans-serif';
          const textWidth = ctx.measureText(text).width;

          ctx.fillStyle = 'rgba(0, 255, 136, 0.9)';
          ctx.fillRect(
            scaledX,
            scaledY > 25 ? scaledY - 25 : scaledY,
            textWidth + 16,
            24
          );

          // Draw label text
          ctx.fillStyle = '#000';
          ctx.fillText(text, scaledX + 8, scaledY > 25 ? scaledY - 7 : scaledY + 17);

          // Voice feedback for high-confidence detections
          if (prediction.score > 0.7) {
            speak(`Detected ${prediction.class}`);
          }
        });
      } catch (error) {
        console.error('Detection error:', error);
      }
    }, 1000);
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
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold hero-title mb-4">
            AI ROBOT EYE
            <br />
            <span className="text-primary">WASTE DETECTION</span>
          </h1>
          <p className="max-w-3xl mx-auto text-muted-foreground text-base md:text-lg">
            Watch through your robot's eye as it detects waste materials like{' '}
            <strong className="text-primary">plastic</strong>,{' '}
            <strong className="text-accent">metal</strong>,{' '}
            <strong className="text-primary">paper</strong>, and more in real-time!
          </p>
        </div>

        {/* Cinematic Camera Display */}
        <div className="glass-card p-8 rounded-3xl mb-8">
          <div className="relative w-full aspect-[21/9] max-h-[600px]">
            <div
              className="absolute inset-0 rounded-2xl border-2 border-primary/50 overflow-hidden bg-black"
              style={{
                boxShadow: '0 0 40px rgba(0, 170, 255, 0.3), 0 0 80px rgba(0, 170, 255, 0.1), inset 0 0 30px rgba(0, 170, 255, 0.05)'
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
                    style={{ display: 'block' }}
                  />
                  <canvas
                    ref={canvasRef}
                    width={1280}
                    height={720}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ mixBlendMode: 'normal' }}
                  />
                  
                  {/* Cinematic Overlay Elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Corner Brackets */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/70" />
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/70" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/70" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/70" />
                    
                    {/* Scan Line */}
                    <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-line" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-black via-primary/5 to-black">
                  {cameraStatus === 'initializing' ? (
                    <>
                      <Camera className="w-24 h-24 text-primary animate-pulse" />
                      <div className="text-primary text-3xl font-bold tracking-wider animate-pulse">
                        INITIALIZING CAMERA SYSTEMS...
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <CameraOff className="w-24 h-24 text-accent animate-pulse" />
                      <div className="text-accent text-3xl md:text-4xl font-bold tracking-wider">
                        CAMERA OFFLINE
                      </div>
                      <div className="glass-card px-6 py-3 rounded-xl">
                        <p className="text-muted-foreground text-base text-center">
                          Enable camera permissions to start detection
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="absolute top-6 left-6 glass-card px-5 py-3 rounded-xl border border-primary/30">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse-glow" />
                <span className="text-primary text-sm font-bold tracking-wider">{statusMessage}</span>
              </div>
            </div>

            {/* Detection Status */}
            {detectionActive && (
              <div className="absolute top-6 right-6 glass-card px-5 py-3 rounded-xl border border-accent/30">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse-glow" />
                  <span className="text-accent text-sm font-bold tracking-wider">AI DETECTION ACTIVE</span>
                </div>
              </div>
            )}

            {/* Info Display */}
            {cameraStatus === 'active' && (
              <div className="absolute bottom-6 left-6 glass-card px-5 py-3 rounded-xl">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Resolution: <span className="text-primary font-mono">1280×720</span></div>
                  <div>Model: <span className="text-accent">COCO-SSD</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Control Button */}
          {cameraStatus === 'active' && model && (
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-primary mb-4">Detection Control</h3>
              <Button
                onClick={detectionActive ? stopDetection : startDetection}
                className={`w-full ${
                  detectionActive 
                    ? 'bg-accent hover:bg-accent/90' 
                    : 'bg-primary hover:bg-primary/90'
                } text-black font-bold py-6 text-lg transition-all duration-300 hover:scale-105`}
              >
                {detectionActive ? (
                  <>
                    <Square className="w-6 h-6 mr-3" />
                    Stop Detection
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 mr-3" />
                    Start AI Detection
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Instructions */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-accent mb-4">How It Works</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">1</span>
                </div>
                <p>Point your camera at objects to detect waste materials</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">2</span>
                </div>
                <p>AI will identify and highlight detected items with bounding boxes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">3</span>
                </div>
                <p>Voice feedback announces detected materials in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWasteDetector;

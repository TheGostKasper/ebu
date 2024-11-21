import React, { useRef, useEffect, useState } from 'react';
import { FaceDetection } from '@mediapipe/face_detection';
import * as cam from '@mediapipe/camera_utils';

const FaceCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const detectionRef = useRef<any>(null); // Ref to store the latest detection
  const [capturedFace, setCapturedFace] = useState<string | null>(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);

  useEffect(() => {
    const faceDetection = new FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: 'short',
      minDetectionConfidence: .9, // Set detection confidence to 80%
    });

    faceDetection.onResults((results) => {
      if (videoRef.current) {
        if (results.detections.length > 0) {
          const detection = results.detections[0];
          const { xCenter, yCenter, width, height } = detection.boundingBox;

          // Expand bounding box by 20% on each side for extra space
          const expandRatio = 2;
          const expandedWidth = width * expandRatio;
          const expandedHeight = height * expandRatio;
          const xMin = xCenter - expandedWidth / 2;
          const yMin = yCenter - expandedHeight / 2;

          // Update detection reference and enable the capture button
          detectionRef.current = { xMin, yMin, width: expandedWidth, height: expandedHeight };
          setIsFaceDetected(true);
        } else {
          // Disable the capture button if no face is detected
          setIsFaceDetected(false);
        }
      }
    });

    if (videoRef.current) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await faceDetection.send({ image: videoRef.current! });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const handleCapture = () => {
    if (detectionRef.current && videoRef.current) {
      const { xMin, yMin, width, height } = detectionRef.current;

      // Create a temporary canvas to capture the expanded face area
      const croppedFaceCanvas = document.createElement('canvas');
      const croppedCtx = croppedFaceCanvas.getContext('2d')!;
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      // Set the size of the temporary canvas
      croppedFaceCanvas.width = width * videoWidth;
      croppedFaceCanvas.height = height * videoHeight;

      // Draw the expanded face area onto the temporary canvas
      croppedCtx.drawImage(
        videoRef.current,
        xMin * videoWidth,
        yMin * videoHeight,
        width * videoWidth,
        height * videoHeight,
        0,
        0,
        croppedFaceCanvas.width,
        croppedFaceCanvas.height
      );

      const faceImage = croppedFaceCanvas.toDataURL('image/png');
      setCapturedFace(faceImage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-100 bg-gray-900 p-4">
      <div className="relative mb-4">
        <video ref={videoRef} className="w-full max-w-md rounded-lg shadow-lg border-4 border-gray-600" autoPlay muted />
      </div>
      <button
        onClick={handleCapture}
        disabled={!isFaceDetected} // Disable button until face is detected
        className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 ${
          isFaceDetected ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
      >
        Capture Face
      </button>
      {capturedFace && (
        <div className="mt-6">
          <img src={capturedFace} alt="Captured Face" className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default FaceCapture;

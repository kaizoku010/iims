import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import './FacialRecognition.css';

function FacialRecognition() {
    const videoRef = useRef();
    const canvasRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const getLabeledFaceDescriptions = async () => {
        const labels = ["dixon"];
        const validDescriptors = [];
        const supportedExtensions = ['png', 'jpg', 'jpeg', 'webp'];

        console.log('Starting face detection for labels:', labels);

        for (const label of labels) {
            try {
                const descriptions = [];
                let validImagesFound = false;

                console.log(`Processing label: ${label}`);

                for (let i = 1; i <= 7; i++) {
                    for (const ext of supportedExtensions) {
                        try {
                            const imgPath = `${process.env.PUBLIC_URL}/labels/${label}/${i}.${ext}`;
                            console.log(`Attempting to load: ${imgPath}`);
                            
                            const img = new Image();
                            img.crossOrigin = 'anonymous';
                            
                            await new Promise((resolve, reject) => {
                                const timeout = setTimeout(() => {
                                    console.log(`Timeout loading: ${imgPath}`);
                                    reject(new Error('Image load timeout'));
                                }, 5000);
                                
                                img.onload = () => {
                                    clearTimeout(timeout);
                                    console.log(`Successfully loaded: ${imgPath}`);
                                    resolve();
                                };
                                
                                img.onerror = () => {
                                    clearTimeout(timeout);
                                    console.log(`Failed to load: ${imgPath}`);
                                    reject(new Error(`Failed to load ${imgPath}`));
                                };
                                img.src = imgPath;
                            });

                            const detection = await faceapi
                                .detectSingleFace(img, new faceapi.SsdMobilenetv1Options({ 
                                    minConfidence: 0.3
                                }))
                                .withFaceLandmarks()
                                .withFaceDescriptor();
                            
                            if (detection) {
                                descriptions.push(detection.descriptor);
                                validImagesFound = true;
                                console.log(`✓ Successfully detected face in ${imgPath}`);
                                break;
                            } else {
                                console.log(`No face detected in ${imgPath}`);
                            }
                        } catch (err) {
                            console.log(`Error processing ${label}/${i}.${ext}:`, err.message);
                        }
                    }
                }
                
                if (descriptions.length > 0) {
                    validDescriptors.push(new faceapi.LabeledFaceDescriptors(label, descriptions));
                    console.log(`✓ Added descriptor for ${label} with ${descriptions.length} images`);
                } else {
                    console.log(`No valid faces found for label: ${label}`);
                }
            } catch (err) {
                console.error(`Error processing label ${label}:`, err);
            }
        }

        if (validDescriptors.length === 0) {
            console.error('No valid descriptors found for any labels');
        }

        return validDescriptors.length > 0 
            ? validDescriptors 
            : [new faceapi.LabeledFaceDescriptors('failed', [new Float32Array(128)])];
    };

    useEffect(() => {
        const loadModelsAndStart = async () => {
            
            try {
                await faceapi.tf.setBackend('webgl'); // Explicit backend
    await faceapi.tf.ready();
                setIsLoading(true);
                
                // Explicitly specify model paths
                const MODEL_URL = `${process.env.PUBLIC_URL}/models`;
                
                // Load models sequentially to avoid conflicts
                await faceapi.nets.ssdMobilenetv1.load(MODEL_URL + '/ssd_mobilenetv1_model-weights_manifest.json');
                console.log('Loaded SSD MobileNet model');
                
                await faceapi.nets.faceLandmark68Net.load(MODEL_URL + '/face_landmark_68_model-weights_manifest.json');
                console.log('Loaded landmark model');
                
                await faceapi.nets.faceRecognitionNet.load(MODEL_URL + '/face_recognition_model-weights_manifest.json');
                console.log('Loaded recognition model');
                
                setIsLoading(false);
                startVideo();
            } catch (err) {
                console.error('Error loading models:', err);
                setError('Failed to load face detection models');
                setIsLoading(false);
            }
        };

        loadModelsAndStart();
        
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: 'user'
                },
                audio: false
            });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error('Error accessing webcam:', err);
            setError('Unable to access webcam');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlay = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        if (!video || !canvas || video.paused || video.ended) return;

        try {
            // Get the labeled face descriptions once
            const labeledFaceDescriptors = await getLabeledFaceDescriptions();
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6); // Increased from 0.3

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const detections = await faceapi
                .detectAllFaces(video, new faceapi.SsdMobilenetv1Options({
                    minConfidence: 0.3,
                    maxResults: 10
                }))
                .withFaceLandmarks()
                .withFaceDescriptors();

            const displaySize = { width: video.videoWidth, height: video.videoHeight };
            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            // Match each detected face against known faces
            resizedDetections.forEach(detection => {
                const box = detection.detection.box;
                const match = faceMatcher.findBestMatch(detection.descriptor);
                
                // Log the match details to help debug
                console.log('Match details:', {
                    label: match.label,
                    distance: match.distance,
                    threshold: faceMatcher._distanceThreshold
                });
                
                // Determine box color based on match confidence
                const isUnknown = match.distance > 0.6; // Adjust this threshold if needed
                const boxColor = isUnknown ? '#FF0000' : '#00FF00';
                
                ctx.strokeStyle = boxColor;
                ctx.lineWidth = 3;
                ctx.strokeRect(box._x, box._y, box._width, box._height);
                
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(box._x, box._y - 25, 150, 25);
                
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '20px Arial';
                // Show the actual label instead of "unknown"
                const displayLabel = isUnknown ? 'Unknown' : match.label;
                const confidence = ((1 - match.distance) * 100).toFixed(0);
                ctx.fillText(`${displayLabel} (${confidence}%)`, box._x + 5, box._y - 5);
            });

            // Debug info
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(10, 10, 300, 60); // Made wider to accommodate labels
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '14px Arial';
            ctx.fillText(`Detections: ${resizedDetections.length}`, 20, 30);
            ctx.fillText(`Known faces: ${labeledFaceDescriptors.map(d => d.label).join(', ')}`, 20, 50);
        } catch (error) {
            console.error('Error in face detection:', error);
        }

        requestAnimationFrame(handlePlay);
    };
    return (
        <div className="facial-recognition-container">
            {error && <div className="error-message">{error}</div>}
            {isLoading && <div className="loading-message">Loading...</div>}
            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    onPlay={handlePlay}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <canvas 
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1
                    }}
                />
            </div>
        </div>
    );
}

export default FacialRecognition;

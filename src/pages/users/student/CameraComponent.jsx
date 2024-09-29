import React, { useRef, useEffect, useState } from "react";
import { sendFrameToBackend } from "../../../apis/student/attendLecture";
import { useNavigate } from "react-router-dom";

const CameraComponent = ({ attendanceId, attended }) => {
  const videoRef = useRef(null);
  const [capturing, setCapturing] = useState(true);
  const navigate = useNavigate(); // State to control frame capture

  const handleFrameCaptured = async (frameDataUrl) => {
    try {
      // Send the captured frame to your backend for facial recognition
      const response = await sendFrameToBackend({
        imageData: frameDataUrl,
        studentId: localStorage.getItem("id"),
        attendanceId: attendanceId,
      });

      console.log(response.status);

      if (response.status === "true") {
        // Stop capturing frames when response.status is true
        setCapturing(false);
        // alert("Attendance marked successfully!");
        attended();
      } else {
        console.error("Failed to send frame:", response);
      }
    } catch (err) {
      console.error("Error sending frame to backend:", err);
    }
  };

  useEffect(() => {
    let stream = null;

    // Start video stream
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing the camera", err);
      });

    // Capture frames at regular intervals if capturing is true
    const intervalId = setInterval(() => {
      if (capturing) {
        captureFrame();
      }
    }, 700); // Capture frame every 500 milliseconds

    return () => {
      clearInterval(intervalId); // Clear interval when the component unmounts
    };
  }, [capturing]); // Re-run the effect if capturing state changes

  // Capture a frame from the video
  const captureFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png"); // Capture frame as base64
      handleFrameCaptured(dataUrl); // Send frame to the backend
    }
  };

  return (
    <div>
      <h3>Live Camera Feed</h3>
      <video ref={videoRef} autoPlay width="720" height="560" />
    </div>
  );
};

export default CameraComponent;

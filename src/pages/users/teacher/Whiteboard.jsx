import React, { useState, useCallback, Suspense, lazy, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uploadTheSVG } from "../../../apis/teacher/homeWorksAndAssignmnet";

// Add this at the top of your file
if (typeof process === "undefined") {
  window.process = { env: { NODE_ENV: "development" } };
}

const Excalidraw = lazy(() =>
  import("@excalidraw/excalidraw")
    .then((module) => ({
      default: module.Excalidraw,
    }))
    .catch((error) => {
      console.error("Error loading Excalidraw:", error);
      return { default: () => <div>Error loading Excalidraw</div> };
    })
);

const Whiteboard = () => {
  console.log("Whiteboard component rendering");
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [error, setError] = useState(null);
  const { uniqueId } = useParams();
  const navigate = useNavigate();

  const onExcalidrawAPIMount = useCallback((api) => {
    setExcalidrawAPI(api);
  }, []);

  const SaveButton = () => {
    const saveAsSVG = async () => {
      if (!excalidrawAPI) {
        console.error("Excalidraw API is undefined");
        alert("Failed to access the drawing");
        return;
      }

      const title = prompt("Enter a title for your SVG:", "My Drawing");
      if (!title) return;

      // try {
      const { exportToSvg } = await import("@excalidraw/excalidraw");
      const svg = await exportToSvg({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
      });

      // Convert the SVG (XML) to a string
      const svgString = new XMLSerializer().serializeToString(svg);

      // Create the JSON object with the title and SVG content
      const whiteboardData = {
        notesName: title,
        svgContent: svgString,
        lectureId: localStorage.getItem("lectureId"),
        teacherId: localStorage.getItem("id"),
        time: Date.now(), // Optional: Add a timestamp or any other metadata
      };
      console.log("Sending SVG save request...");

      // Replace with your actual cloud storage URL or API endpoint
      const response = await uploadTheSVG(whiteboardData);
      console.response(response);
      console.log("SVG successfully uploaded", result);
      alert("SVG saved successfully!");
      // } catch (error) {
      //   console.error("Error saving SVG:", error);
      //   alert("Failed to save the SVG.");
      // }
    };

    return (
      <button
        onClick={saveAsSVG}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1000, // This ensures the button is on top
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // Optional: adds a subtle shadow
        }}
      >
        Save as SVG
      </button>
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Suspense fallback={<div>Loading Excalidraw...</div>}>
        <Excalidraw
          excalidrawAPI={onExcalidrawAPIMount}
          initialData={{
            elements: [],
            appState: { viewBackgroundColor: "#ffffff" },
          }}
        />
      </Suspense>
      <SaveButton />
    </div>
  );
};

export default Whiteboard;

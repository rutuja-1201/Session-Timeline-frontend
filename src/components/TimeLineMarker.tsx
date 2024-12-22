import React from "react";
import axios from "axios";

interface EventProps {
  event: {
    type: string;
    time: string;
  };
  sessionId: string;
  participantId: string;
}

const TimelineMarker: React.FC<EventProps> = ({ event, sessionId, participantId }) => {
  const getIconPath = () => {
    switch (event.type) {
      case "webcam":
        return "/video-icon.svg";
      case "screenShare":
        return "/monitor-icon.svg";
      case "screenShareAudio":
        return "/mic-icon.svg";
      case "errors":
        return "/error-icon.svg";
      default:
        return "/leave-icon.svg";
    }
  };

  const logEvent = async () => {
    try {
      await axios.post(
        `/api/sessions/${sessionId}/participants/${participantId}/events/${event.type}`,
        {
          timestamp: event.time,
        }
      );
      alert(`Event logged: ${event.type} at ${event.time}`);
    } catch (error) {
      console.error("Error logging event:", error);
      alert("Failed to log event. Please try again.");
    }
  };

  return (
    <div
      className="relative flex items-center cursor-pointer"
      style={{
        left: `${Math.random() * 90}%`, 
      }}
      title={`${event.type} at ${event.time}`}
      onClick={logEvent}
    >
      {/* Vertical Line */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 border-l-2 border-blue-500"
        style={{
          height: "100%", 
        }}
      ></div>

      {/* Horizontal Line to connect the event marker */}
      <div
        className="absolute w-full h-0.5 bg-blue-500"
        style={{
          backgroundColor: "#5568FE",
          zIndex: -1,
        }}
      ></div>

      {/* Event Marker (Icon) */}
      <div className="relative text-white text-sm rounded-full w-8 h-8 flex items-center justify-center">
        <img src={getIconPath()} alt={event.type} className="w-6 h-6" />
      </div>
    </div>
  );
};

export default TimelineMarker;

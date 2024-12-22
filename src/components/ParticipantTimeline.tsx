import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import TimelineMarker from "./TimeLineMarker";

interface ParticipantProps {
  participant: {
    id: string;
    name: string;
    events: { type: string; time: string }[];
  };
  sessionId: string;
}

const ParticipantTimeline: React.FC<ParticipantProps> = ({ participant, sessionId }) => {
  const [events, setEvents] = useState(participant.events);

  const addMultipleEventsToTimeline = async () => {
    const newEvents = [
      {
        type: "webcam",
        start: "2024-12-20T12:00:00.000Z",
        end: "2024-12-20T12:10:00.000Z",
      },
      {
        type: "screenShare",
        start: "2024-12-20T12:15:00.000Z",
        end: "2024-12-20T12:25:00.000Z",
      },
      {
        type: "screenShareAudio",
        start: "2024-12-20T12:20:00.000Z",
        end: "2024-12-20T12:30:00.000Z",
      },
      {
        type: "errors",
        start: "2024-12-20T12:50:00.000Z",
        end: "2024-12-20T13:00:00.000Z",
      },
    ];
  
    try {
      const eventPromises = newEvents.map((event) =>
        axiosInstance.post(
          `/sessions/${sessionId}/participants/${participant.id}/events/${event.type}`,
          {
            start: event.start,
            end: event.end,
          }
        )
      );
  
      const responses = await Promise.all(eventPromises); 
      const addedEvents = responses.map((response) => response.data); 
  
      setEvents((prevEvents) => [...prevEvents, ...addedEvents]); 
    } catch (error) {
      console.error("Error adding multiple events:", error);
    }
  };
  

  useEffect(() => {
    addMultipleEventsToTimeline();
  }, [participant.id, sessionId]);

  return (
    <div className="bg-[#181818] border-b-2 p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">
          {participant.name} ({participant.id})
        </h2>
        <button className="text-blue-500 hover:underline text-sm">View details</button>
      </div>
      <div className=" bg-[#181818] rounded">
        {events.map((event, index) => (
          <TimelineMarker
            key={index}
            event={event}
            sessionId={sessionId}
            participantId={participant.id}
            
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipantTimeline;

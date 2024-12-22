import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import TimeScale from "../components/TimeScale";
import ParticipantTimeline from "../components/ParticipantTimeline";

interface Event {
  type: string;
  time: string;
}

interface Participant {
  id: string;
  name: string;
  events: Event[];
}

const Timeline: React.FC = () => {
  const { sessionId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(true); // State to toggle visibility

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await axiosInstance.get(`/sessions`);
        const sessionsData = response.data;

        const sessionData = sessionsData.find(
          (session: any) => String(session.meetingId) === String(sessionId)
        );

        if (!sessionData) {
          console.error("Session not found for ID:", sessionId);
          setError("Session not found.");
          return;
        }

        const processedParticipants = sessionData?.participantArray?.map(
          (participant: any) => ({
            id: participant.participantId,
            name: participant.name,
            events: Array.isArray(participant.events) ? participant.events : [],
          })
        );

        setParticipants(processedParticipants);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timeline:", err);
        setError("Failed to load timeline. Please try again.");
      }
    };

    fetchTimeline();
  }, [sessionId]);

  if (loading) {
    return <div className="text-center text-white">Loading timeline...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }


  return (
    <div className="min-h-screen bg-[#181818] text-white p-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold mb-6 flex">
          <img src="/participant-icon.svg" className="w-12" alt="Participant Icon" />
          Participant-wise Session Timeline
        </h1>
  
        <div className="flex items-center gap-6 border-r-2 border-gray-400 pr-6">
          <div className="text-gray-400">Show participant timeline</div>
          <div
            className="toggle-switch cursor-pointer"
            onClick={() => setShowTimeline(!showTimeline)}
          >
            <div
              className={`toggle-circle ${showTimeline ? "toggle-on" : "toggle-off"}`}
            ></div>
          </div>
        </div>
      </div>
      <TimeScale />
      {showTimeline && (
        <div className="space-y-6">
          {participants.map((participant, index) => (
            <ParticipantTimeline
              key={index}
              participant={participant}
              sessionId={sessionId!}
            />
          ))}
        </div>
      )}
    </div>
  );
  
};

export default Timeline;

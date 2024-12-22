import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { FaSpinner } from "react-icons/fa";

interface Session {
  id: string;
  name: string;
  startTime: string;
  duration: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axiosInstance.get("/sessions?page=1&limit=10");
        const data = response.data;
        setSessions(
          data.map((session: any) => ({
            id: session.meetingId,
            name: `Session ${session.meetingId}`,
            startTime: new Date(session.start).toLocaleTimeString(),
            duration: `${Math.ceil(
              (new Date(session.end).getTime() - new Date(session.start).getTime()) / 60000
            )} mins`,
          }))
        );
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-100">Sessions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => navigate(`/timeline/${session.id}`)}
            className="p-6 bg-[#1F1F1F] rounded-xl shadow-lg cursor-pointer hover:bg-gray-700 hover:scale-105 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-300">{session.name}</h2>
            <p className="text-gray-400 mb-2">Start Time: {session.startTime}</p>
            <p className="text-gray-400">Duration: {session.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

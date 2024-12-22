import React from "react";

const TimeScale: React.FC = () => {
  const times = ["12:00", "12:01" ,"12:02", "12:05", "12:08", "12:09", "12:10", "12:12", "12:14" ,"12:16" ,"12:18" ,"12:20"];

  return (
    <div className="flex items-center justify-between bg-[#1F1F1F] p-2 rounded mb-4">
      {times.map((time) => (
        <span key={time} className="text-gray-400 text-sm">
          {time}
        </span>
      ))}
    </div>
  );
};

export default TimeScale;

import React from "react";

const StreakTracker = ({ currentStreak, bestStreak }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">🔥 Current Streak</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-orange-500 mb-2">
          {currentStreak} days
        </div>
        <p className="text-gray-600">
          Keep logging daily to maintain your streak!
        </p>
        <div className="mt-4 flex justify-center space-x-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i < currentStreak ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              {i < currentStreak ? "✓" : i + 1}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Best streak: {bestStreak} days
        </p>
      </div>
    </div>
  );
};

export default StreakTracker;

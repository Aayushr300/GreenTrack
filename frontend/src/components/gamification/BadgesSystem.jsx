import React from "react";

const BadgesSystem = ({ userStats }) => {
  const badges = [
    {
      id: 1,
      name: "Eco Novice",
      icon: "🌱",
      desc: "Log first carbon entry",
      earned: userStats.entries > 0,
    },
    {
      id: 2,
      name: "Week Warrior",
      icon: "🔥",
      desc: "7-day logging streak",
      earned: userStats.currentStreak >= 7,
    },
    {
      id: 3,
      name: "Carbon Cutter",
      icon: "✂️",
      desc: "Reduce emissions by 10%",
      earned: userStats.reduction >= 10,
    },
    {
      id: 4,
      name: "Offset Hero",
      icon: "🦸",
      desc: "Offset 100kg CO₂",
      earned: userStats.totalOffset >= 100,
    },
    {
      id: 5,
      name: "Transport Master",
      icon: "🚗",
      desc: "Log 50 transport entries",
      earned: userStats.transportEntries >= 50,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Your Badges</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`text-center p-3 rounded-lg border-2 ${
              badge.earned
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-gray-50 opacity-50"
            }`}
          >
            <div className="text-2xl mb-2">{badge.icon}</div>
            <p className="font-semibold text-sm">{badge.name}</p>
            <p className="text-xs text-gray-600 mt-1">{badge.desc}</p>
            {badge.earned && (
              <div className="text-xs text-green-600 font-semibold mt-1">
                ✓ Earned
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesSystem;

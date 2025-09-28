import React from "react";

const Leaderboard = () => {
  const leaderboardData = [
    { id: 1, name: "Eco Warrior", reduction: 45, avatar: "🌍" },
    { id: 2, name: "Green Giant", reduction: 38, avatar: "🌱" },
    { id: 3, name: "Climate Hero", reduction: 32, avatar: "🦸" },
    { id: 4, name: "You", reduction: 15, avatar: "😊" },
    { id: 5, name: "Tree Hugger", reduction: 28, avatar: "🌳" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">🏆 Community Leaderboard</h3>
      <div className="space-y-3">
        {leaderboardData.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              user.name === "You"
                ? "bg-green-50 border border-green-200"
                : "bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index < 3
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index < 3 ? ["🥇", "🥈", "🥉"][index] : index + 1}
              </div>
              <div className="text-2xl">{user.avatar}</div>
              <div>
                <p
                  className={`font-semibold ${
                    user.name === "You" ? "text-green-700" : "text-gray-900"
                  }`}
                >
                  {user.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">-{user.reduction}%</p>
              <p className="text-xs text-gray-500">CO₂ reduction</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

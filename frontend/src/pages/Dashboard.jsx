// import React, { useState, useEffect } from "react";
// import { carbonAPI } from "../services/api";
// import MetricCard from "../components/dashboard/MetricCard";
// import EmissionsChart from "../components/dashboard/EmissionsChart";
// import QuickLog from "../components/dashboard/QuickLog";
// import OffsetCalculator from "../components/offsets/OffsetCalculator";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("overview");

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const response = await carbonAPI.getStats();
//       setStats(response.data.data);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Carbon Dashboard</h1>
//           <p className="text-gray-600">
//             Track and reduce your environmental impact
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="-mb-px flex space-x-8">
//               {["overview", "offset"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab
//                       ? "border-green-500 text-green-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                 >
//                   {tab === "overview" ? "Overview" : "Carbon Offset"}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {activeTab === "overview" ? (
//           <>
//             {/* Metric Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <MetricCard
//                 title="Total Emissions"
//                 value={stats?.totalEmissions?.toFixed(1) || "0.0"}
//                 unit="kg CO₂"
//                 subtitle="Last 30 days"
//               />
//               <MetricCard
//                 title="Daily Average"
//                 value={((stats?.totalEmissions || 0) / 30).toFixed(1)}
//                 unit="kg CO₂"
//                 trend="down"
//                 change="-5%"
//               />
//               <MetricCard
//                 title="Carbon Goal"
//                 value="68%"
//                 subtitle="of monthly target"
//                 progress={68}
//               />
//               <MetricCard
//                 title="Offset Balance"
//                 value="0"
//                 unit="kg CO₂"
//                 action="Offset Now"
//                 onAction={() => setActiveTab("offset")}
//               />
//             </div>

//             {/* Chart and Quick Log Section */}
//             <div className="grid lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-lg shadow p-6">
//                   <h2 className="text-xl font-semibold mb-4">
//                     Weekly Emissions Trend
//                   </h2>
//                   <EmissionsChart data={stats?.weeklyTrend || []} />
//                 </div>
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickLog onEntryAdded={fetchStats} />
//               </div>
//             </div>

//             {/* Category Breakdown */}
//             {stats?.emissionsByCategory &&
//               stats.emissionsByCategory.length > 0 && (
//                 <div className="bg-white rounded-lg shadow p-6">
//                   <h2 className="text-xl font-semibold mb-4">
//                     Emissions by Category
//                   </h2>
//                   <div className="space-y-3">
//                     {stats.emissionsByCategory.map((category) => (
//                       <div
//                         key={category._id}
//                         className="flex items-center justify-between"
//                       >
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
//                           <span className="capitalize">{category._id}</span>
//                         </div>
//                         <span className="font-semibold">
//                           {category.total.toFixed(1)} kg CO₂
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//           </>
//         ) : (
//           <OffsetCalculator />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { carbonAPI } from "../services/api";
import MetricCard from "../components/dashboard/MetricCard";
import EmissionsChart from "../components/dashboard/EmissionsChart";
import QuickLog from "../components/dashboard/QuickLog";
import OffsetCalculator from "../components/offsets/OffsetCalculator";
import BadgesSystem from "../components/gamification/BadgesSystem";
import StreakTracker from "../components/gamification/StreakTracker";
import Leaderboard from "../components/gamification/Leaderboard";
import EntryList from "../components/dashboard/EntryList";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [showShareModal, setShowShareModal] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Function to trigger achievement
  const triggerAchievement = (achievement) => {
    setCurrentAchievement(achievement);
    setShowShareModal(true);
  };

  // Add this after your main dashboard content
  {
    showShareModal && (
      <ShareAchievement
        achievement={currentAchievement}
        onClose={() => setShowShareModal(false)}
      />
    );
  }

  // Example: Trigger when user completes first offset
  const handleFirstOffset = () => {
    triggerAchievement({
      message: "You've offset your first 100kg of CO₂! 🌍",
      description: "offset 100kg of carbon emissions",
      hashtags: "#ClimateAction #CarbonNeutral #GreenTrack",
    });
  };

  useEffect(() => {
    fetchStats();
    fetchUserStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await carbonAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUserStats = async () => {
    // Mock user stats - replace with actual API
    setUserStats({
      entries: 12,
      currentStreak: 5,
      bestStreak: 7,
      reduction: 15,
      totalOffset: 120,
      transportEntries: 8,
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Carbon Dashboard</h1>
          <p className="text-gray-600">
            Track and reduce your environmental impact
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["overview", "entries", "offset", "achievements"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Metric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Emissions"
                value={stats?.totalEmissions?.toFixed(1) || "0.0"}
                unit="kg CO₂"
                subtitle="Last 30 days"
              />
              <MetricCard
                title="Daily Average"
                value={((stats?.totalEmissions || 0) / 30).toFixed(1)}
                unit="kg CO₂"
                trend="down"
                change="-5%"
              />
              <MetricCard
                title="Carbon Goal"
                value="68%"
                subtitle="of monthly target"
                progress={68}
              />
              <MetricCard
                title="Offset Balance"
                value={userStats.totalOffset || "0"}
                unit="kg CO₂"
                action="Offset Now"
                onAction={() => setActiveTab("offset")}
              />
            </div>

            {/* Chart and Quick Log Section */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Weekly Emissions Trend
                  </h2>
                  <EmissionsChart data={stats?.weeklyTrend || []} />
                </div>
              </div>
              <div className="lg:col-span-1">
                <QuickLog onEntryAdded={fetchStats} />
              </div>
            </div>

            {/* Gamification Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <StreakTracker
                currentStreak={userStats.currentStreak}
                bestStreak={userStats.bestStreak}
              />
              <Leaderboard />
            </div>
          </>
        )}

        {activeTab === "entries" && <EntryList />}

        {activeTab === "offset" && <OffsetCalculator />}

        {activeTab === "achievements" && (
          <div className="space-y-6">
            <BadgesSystem userStats={userStats} />
            <StreakTracker
              currentStreak={userStats.currentStreak}
              bestStreak={userStats.bestStreak}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

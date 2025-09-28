// import React, { useState } from "react";
// import { carbonAPI } from "../../services/api";

// const QuickLog = ({ onEntryAdded }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     category: "transport",
//     activity: "",
//     details: {},
//   });
//   const [loading, setLoading] = useState(false);

//   const categories = {
//     transport: ["car", "bus", "train", "plane", "motorcycle"],
//     food: ["beef", "chicken", "fish", "vegetables", "fruits"],
//     energy: ["electricity", "natural_gas", "heating_oil"],
//   };

//   const handleCategoryChange = (category) => {
//     setFormData({
//       category,
//       activity: categories[category][0],
//       details: {},
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await carbonAPI.addEntry(formData);
//       setShowForm(false);
//       setFormData({
//         category: "transport",
//         activity: "",
//         details: {},
//       });
//       onEntryAdded();
//     } catch (error) {
//       console.error("Error adding entry:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDetailFields = () => {
//     switch (formData.category) {
//       case "transport":
//         return (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Distance (km)
//             </label>
//             <input
//               type="number"
//               step="0.1"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//               value={formData.details.distance || ""}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   details: {
//                     ...formData.details,
//                     distance: parseFloat(e.target.value),
//                   },
//                 })
//               }
//               required
//             />
//           </div>
//         );
//       case "food":
//       case "energy":
//         return (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Quantity
//             </label>
//             <input
//               type="number"
//               step="0.1"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//               value={formData.details.quantity || ""}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   details: {
//                     ...formData.details,
//                     quantity: parseFloat(e.target.value),
//                   },
//                 })
//               }
//               required
//             />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   if (!showForm) {
//     return (
//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Quick Log</h3>
//         <div className="grid grid-cols-2 gap-3">
//           <button
//             onClick={() => handleCategoryChange("transport")}
//             className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
//           >
//             🚗 Transport
//           </button>
//           <button
//             onClick={() => handleCategoryChange("food")}
//             className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
//           >
//             🍕 Food
//           </button>
//           <button
//             onClick={() => handleCategoryChange("energy")}
//             className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition"
//           >
//             ⚡ Energy
//           </button>
//           <button
//             onClick={() => handleCategoryChange("other")}
//             className="p-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition"
//           >
//             🛒 Other
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h3 className="text-lg font-semibold mb-4">Log New Entry</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Category
//           </label>
//           <select
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//             value={formData.category}
//             onChange={(e) => handleCategoryChange(e.target.value)}
//           >
//             <option value="transport">Transport</option>
//             <option value="food">Food</option>
//             <option value="energy">Energy</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Activity
//           </label>
//           <select
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//             value={formData.activity}
//             onChange={(e) =>
//               setFormData({ ...formData, activity: e.target.value })
//             }
//           >
//             {categories[formData.category]?.map((activity) => (
//               <option key={activity} value={activity}>
//                 {activity.charAt(0).toUpperCase() + activity.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         {getDetailFields()}

//         <div className="flex space-x-3">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
//           >
//             {loading ? "Adding..." : "Add Entry"}
//           </button>
//           <button
//             type="button"
//             onClick={() => setShowForm(false)}
//             className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default QuickLog;

import React, { useState } from "react";
import { carbonAPI } from "../../services/api";

const QuickLog = ({ onEntryAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "transport",
    activity: "",
    details: {},
  });
  const [loading, setLoading] = useState(false);

  const categories = {
    transport: {
      icon: "🚗",
      activities: [
        { value: "car", label: "Car", unit: "km" },
        { value: "bus", label: "Bus", unit: "km" },
        { value: "train", label: "Train", unit: "km" },
        { value: "plane", label: "Plane", unit: "km" },
        { value: "motorcycle", label: "Motorcycle", unit: "km" },
      ],
    },
    food: {
      icon: "🍕",
      activities: [
        { value: "beef", label: "Beef", unit: "kg" },
        { value: "chicken", label: "Chicken", unit: "kg" },
        { value: "fish", label: "Fish", unit: "kg" },
        { value: "vegetables", label: "Vegetables", unit: "kg" },
        { value: "fruits", label: "Fruits", unit: "kg" },
      ],
    },
    energy: {
      icon: "⚡",
      activities: [
        { value: "electricity", label: "Electricity", unit: "kWh" },
        { value: "natural_gas", label: "Natural Gas", unit: "m³" },
        { value: "heating_oil", label: "Heating Oil", unit: "L" },
      ],
    },
  };

  const handleCategoryChange = (category) => {
    setFormData({
      category,
      activity: categories[category].activities[0].value,
      details: {},
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await carbonAPI.addEntry(formData);
      setShowForm(false);
      setFormData({
        category: "transport",
        activity: "",
        details: {},
      });
      onEntryAdded();
    } catch (error) {
      console.error("Error adding entry:", error);
      alert("Error adding entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDetailFields = () => {
    const currentCategory = categories[formData.category];
    const currentActivity = currentCategory.activities.find(
      (a) => a.value === formData.activity
    );

    if (!currentActivity) return null;

    switch (formData.category) {
      case "transport":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distance ({currentActivity.unit})
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={formData.details.distance || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: {
                    ...formData.details,
                    distance: parseFloat(e.target.value),
                  },
                })
              }
              required
            />
          </div>
        );
      case "food":
      case "energy":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity ({currentActivity.unit})
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={formData.details.quantity || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: {
                    ...formData.details,
                    quantity: parseFloat(e.target.value),
                  },
                })
              }
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!showForm) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Log</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <span className="font-medium capitalize">{key}</span>
            </button>
          ))}
          <button
            onClick={() => handleCategoryChange("other")}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
          >
            <div className="text-2xl mb-2">📝</div>
            <span className="font-medium">Other</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Log New Entry</h3>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {Object.entries(categories).map(([key, category]) => (
              <option key={key} value={key}>
                {category.icon} {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
            <option value="other">📝 Other</option>
          </select>
        </div>

        {formData.category !== "other" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={formData.activity}
              onChange={(e) =>
                setFormData({ ...formData, activity: e.target.value })
              }
            >
              {categories[formData.category].activities.map((activity) => (
                <option key={activity.value} value={activity.value}>
                  {activity.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {getDetailFields()}

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50 font-medium"
          >
            {loading ? "Adding..." : "Add Entry"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickLog;

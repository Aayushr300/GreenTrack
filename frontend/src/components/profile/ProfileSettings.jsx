import React, { useState, useEffect } from "react";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const ProfileSettings = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    householdSize: 1,
    carbonGoal: 2000,
    units: "metric",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.profile?.name || "",
        location: user.profile?.location || "",
        householdSize: user.profile?.householdSize || 1,
        carbonGoal: user.profile?.carbonGoal || 2000,
        units: user.preferences?.units || "metric",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "householdSize" || name === "carbonGoal"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await authAPI.updateProfile({
        name: formData.name,
        location: formData.location,
        householdSize: formData.householdSize,
        carbonGoal: formData.carbonGoal,
        preferences: {
          units: formData.units,
        },
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Profile Settings
            </h2>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                message.includes("Error")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            {/* Carbon Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Carbon Settings
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Household Size
                  </label>
                  <select
                    name="householdSize"
                    value={formData.householdSize}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Carbon Goal (kg CO₂)
                  </label>
                  <input
                    type="number"
                    name="carbonGoal"
                    value={formData.carbonGoal}
                    onChange={handleChange}
                    min="500"
                    max="10000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower goal = more ambitious reduction
                  </p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Preferences
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Measurement Units
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="units"
                      value="metric"
                      checked={formData.units === "metric"}
                      onChange={handleChange}
                      className="mr-2 text-green-500 focus:ring-green-500"
                    />
                    Metric (km, kg)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="units"
                      value="imperial"
                      checked={formData.units === "imperial"}
                      onChange={handleChange}
                      className="mr-2 text-green-500 focus:ring-green-500"
                    />
                    Imperial (miles, lbs)
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

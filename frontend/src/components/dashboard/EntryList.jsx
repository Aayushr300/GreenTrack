import React, { useState, useEffect } from "react";
import { carbonAPI } from "../../services/api";

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, [page]);

  const fetchEntries = async () => {
    try {
      const response = await carbonAPI.getEntries({ page, limit: 10 });
      if (page === 1) {
        setEntries(response.data.data);
      } else {
        setEntries((prev) => [...prev, ...response.data.data]);
      }
      setHasMore(page < response.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await carbonAPI.deleteEntry(id);
        setEntries((prev) => prev.filter((entry) => entry._id !== id));
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (loading && entries.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Recent Entries</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {entries.map((entry) => (
          <div key={entry._id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">
                    {getCategoryIcon(entry.category)}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {entry.activity}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {entry.category} •{" "}
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    {entry.details && (
                      <p className="text-sm text-gray-600 mt-1">
                        {getDetailsText(entry.category, entry.details)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-red-600">
                  {entry.emission.toFixed(1)} kg
                </p>
                <p className="text-sm text-gray-500">CO₂</p>
                <button
                  onClick={() => deleteEntry(entry._id)}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {entries.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No entries yet. Start by logging your first carbon activity!</p>
        </div>
      )}
    </div>
  );
};

// Helper functions
const getCategoryIcon = (category) => {
  const icons = {
    transport: "🚗",
    food: "🍕",
    energy: "⚡",
    shopping: "🛒",
    other: "📝",
  };
  return icons[category] || "📝";
};

const getDetailsText = (category, details) => {
  switch (category) {
    case "transport":
      return `Distance: ${details.distance} km`;
    case "food":
    case "energy":
      return `Quantity: ${details.quantity} ${details.unit || "units"}`;
    default:
      return details.description || "";
  }
};

export default EntryList;
